const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email Address"],
        required: [true, 'Please provide your email address'],
        unique: [true, 'User already exist with this email.']
    },
    password: {
        type: String,
        trim: true,
        validate: [validator.isStrongPassword, "Please provide a Strong Password"],
        required: [true, 'Please provide your password'],
    },
    confirmPassword: {
        type: String,
        trim: true,
        validate: [validator.isStrongPassword, "Please provide a Strong Password"],
        required: [true, 'Please provide confirm password'],
    },
    role: {
        type: String,
        enum: ["admin", "hiring-manager", "candidate"],
        default: "candidate"
    }
},
    {
        timestamps: true
    });
userSchema.pre('save', function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});
userSchema.methods.comparePassword = (password, hashedPassword) => {
    const compareResult = bcrypt.compareSync(password, hashedPassword);
    return compareResult;
}

const User = mongoose.model('User', userSchema);


module.exports = User;