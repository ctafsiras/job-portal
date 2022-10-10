const verifyRole = (...roles) => {
    return (req, res, next) => {
        const role = req.decoded.role;
        if (!roles.includes(role)) {
            return res.status(400).json({
                status: 'fail',
                message: "Your are UnAuthorized to visit it!"
            })
        }
        next();
    }
}
module.exports = verifyRole;