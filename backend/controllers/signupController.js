const { auth } = require("../config");
const { db } = require("../config");

// Function to create user
const createNewUser = async (req, res) => {
    const { phoneNumber, userId, token} = req.body;

        // // Check if user already exists, have already signed up before
        // try {
        //     const existingUser = await auth.getUserByPhoneNumber(phoneNumber);
        //     console.log("User already exists:", existingUser);
        //     return res.status(400).json({
        //         message: "User already exists!"
        //     });
        // } catch (userNotFoundError) {
        //     console.log("Creating new user...");
        // }

        // Check if the userId already exists in firestore
        const userDoc = await db.collection("Users").doc(userId).get();
        if (userDoc.exists) {
            console.log("Username already exists in Firestore:", userDoc.data());
            return res.status(400).json({
                message: "Username is already taken, please choose another username!"
            });
        }

    try{
        // Create a record in Firestore for the new user
        await db.collection("Users").doc(userId).set({
            phoneNumber: phoneNumber,
            userId: userId,
            token: token,
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