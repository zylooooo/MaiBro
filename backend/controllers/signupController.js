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

        const userRecord = await auth.createUser({
            phoneNumber: phoneNumber,
            password: password,
            userId: userId
        });

        console.log("Successfully created new user:", userRecord.uid);

        // Create a record in Firestore for the new user
        await db.collection("Users").doc(userRecord.uid).set({
            phoneNumber: phoneNumber,
            password: password,
            userId: userRecord.uid
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