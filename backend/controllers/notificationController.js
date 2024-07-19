const { admin } = require("../config");

async function sendNotification(req, res) {
    // Retrieve the token from the request body
    const { userName, msg } = req.body;
    // Get the token from the database
    const user = await admin.firestore().collection('Users').doc(userName).get();
    const token = user.data().token;

    if (token == null) {
        console.log('No notification sent');
        return res.status(400).json({
            message: "Token not found",
        });
    }
    
    // Create a message
    const message = {
        notification: {
            title: 'New Chat Message',
            body: msg,
        },
        token: token
    };
    // Send the message to the device corresponding to the token
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string
            console.log('Successfully sent message:', response);
            return res.status(200).json({
                message: "Notification sent successfully",
            });
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            return res.status(500).json({
                message: "Error sending notification",
            });
        });
    return res.status(200)
}


module.exports = { sendNotification };