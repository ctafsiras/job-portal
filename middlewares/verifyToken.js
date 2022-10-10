const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                status: 'fail',
                message: "User Unauthenticated! Login First, no token found!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't verify the token!",
            err
        })
    }
}
module.exports = verifyToken;