const { auth } = require("../config");

async function verifyLogin(req, res, next) {
    let idToken = req.headers.idtoken;

    return auth
        .verifyLogin(idToken)
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

module.exports = { verifyLogin };