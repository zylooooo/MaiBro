const { auth } = require("../config");
const { db } = require("../config");

async function authLogin(req, res) {
    // Retrieve the token key from the request body
    let {token, userId} = req.body;

    // Check if token key is same to document in firestore
    const userDoc = await db.collection("Users").doc(userId).get();
    const userToken = userDoc.data().token;

    if (userToken !== token) {
        // Replace the token in the document
        await db.collection("Users").doc(userId).update({ token: token});
    }


}

module.exports = { authLogin };