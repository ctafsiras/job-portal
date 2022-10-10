const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

module.exports = generateToken;