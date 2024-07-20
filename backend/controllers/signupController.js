const { db } = require("../config");

/**
 * Create new users in the database with their login details if the user does not already exist.
 * @param {Object} req  - The request object that contains the phoneNumber, userId and token of the user.
 * @param {Object} res  - The response object used to send back the HTTP response.
 * @returns - Return the response object with the status of the request.
 */
const createNewUser = async (req, res) => {
    const { phoneNumber, userId, token} = req.body;
        // Check if the userId already exists in firestore
        const userDoc = await db.collection("Users").doc(userId).get();
        if (userDoc.exists) {
            return res.status(400).json({
                message: "Username is already taken, please choose another username!"
            });
        }

    try{
        await db.collection("Users").doc(userId).set({
            phoneNumber: phoneNumber,
            userId: userId,
            token: token,
        });

        return res.status(200).json({
            message: "Successfully created a new user!"
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error creating new user!"
        });
    }
}

module.exports = { createNewUser };