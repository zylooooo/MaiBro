const { auth } = require("../config");
const { db } = require("../config");

// Function to create user
const createNewUser = async (req, res) => {
    const { phoneNumber, password, userId } = req.body;

    try {
        // Check if user already exists, have already signed up before
        try {
            const existingUser = await auth.getUserByPhoneNumber(phoneNumber);
            console.log("User already exists:", existingUser);
            return res.status(400).json({
                message: "User already exists!"
            });
        } catch (userNotFoundError) {
            console.log("Creating new user...");
        }

        // Check if the userId already exists in firestore
        try {
            const userDoc = await db.collection("Users").doc(userId).get();
            if (userDoc.exists) {
                console.log("Username already exists in Firestore:", userDoc.data());
                return res.status(400).json({
                    message: "Username is already taken, please choose another username!"
                });
            }
        } catch (error) {
            console.error("Error checking if user exists in Firestore:", error);
        }

        // Create a new account for the user
        const userRecord = await auth.createUser({
            phoneNumber: phoneNumber,
            password: password,
            userId: userId
        });
        console.log("Successfully created new user:", userRecord.uid);

        // Create a record in Firestore for the new user
        await db.collection("Users").doc(userId).set({
            phoneNumber: phoneNumber,
            password: password,
            userId: userId
        });

        return res.status(200).json({
            message: "Successfully created a new user!"
        });
    } catch (error) {
        console.error("Error creating new user:", error);
        return res.status(400).json({
            message: "Error creating new user!"
        });
    }
}

module.exports = { createNewUser };