const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        console.log("authheader : ", authHeader);
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const decode = jwt.decode(token, process.env.JWT_SECRET);
            req.decode = decode;
            next();
        } else {
            return res.status(404).json({
                success: false,
                message: "Not a valid authorization token"
            })
        }
    }
    catch (e) {
        return res.status(401).json({
            success: false,
            message: "Token is invalid"
        })
    }
}