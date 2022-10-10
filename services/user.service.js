const User = require("../models/user.model");

exports.signUpService=async(data)=>{
    const result=await User.create(data);
    return result;
}
exports.getUser=async(email)=>{
    const user=await User.findOne({email: email});
    return user;
}