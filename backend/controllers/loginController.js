const { auth } = require("../config");

async function authLogin(req, res, next) {
    // Retrieve the idToken key from the request body
    let idToken = req.body.idToken;

    // Return 200 if the idToken is correct and 401 if it is incorrect
    return auth
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log("decoded token", decodedToken);

            res.status(200).json({
                message: "You have successfully logged in.",
                login: true,
            });

            next();
        })
        .catch((error) => {
            console.error("decoded token error", error);
            return res.status(401).json({
                error: "You are not authroized to access this account.",
                login: false,
            });
        });
}

module.exports = { authLogin };