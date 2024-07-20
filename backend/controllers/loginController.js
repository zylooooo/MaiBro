const { db } = require("../config");

/**
 * Authenticates user Login by checking if they have a valid account and token key.
 * @param {Object} req - The request object that contains the token and userId of the user. 
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns - Returns the response object with the status of the request.
 */
async function authLogin(req, res) {
    // Retrieve the token key from the request body
    const {token, userId} = req.body;

    try {
        const userRef = db.collection("Users").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        const userToken = userDoc.data().token;

        if (userToken !== token) {
            await userRef.update({ token });
            return res.status(200).json({
                message: "User authenticated successfully!",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Failed to authenticate user!",
        });
    }
}

module.exports = { authLogin };