const { auth } = require("../config");

// Function to create user
const createNewUser = async (req, res) => {
    const { phoneNumber, password, userId } = req.body;

    try {
        await auth.createUser({
            phoneNumber: phoneNumber,
            password: password,
            userId : userId
        }).then((userRecord) => {
            console.log("Successfully created new user:", userRecord.uid);;
            res.status(200).json({
                message: "Account created successfully!"
            });
        })
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(400).json({
            message: "Error creating new user!"
        });
    }
}

module.exports = { createNewUser };