const { signUpService, getUser } = require("../services/user.service")
const generateToken = require("../utils/generateToken");

exports.signUpController = async (req, res) => {
    try {
        const signUpInfo = req.body;
        if (!signUpInfo.email || !signUpInfo.password || !signUpInfo.name || !signUpInfo.confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: "Please provide all the necessary information"
            })
        }
        if (signUpInfo.password !== signUpInfo.confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                message: "Your provided passwords are not same!"
            })
        }

        const user = await signUpService(signUpInfo);
        user.password = undefined;
        const token = generateToken(user);
        res.status(200).json({
            status: 'success',
            message: "User Created successfully!",
            data: user,
            token
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't create the user!",
            error
        })
    }
}
exports.loginController = async (req, res) => {
    try {
        const loginInfo = req.body;
        if (!loginInfo.email || !loginInfo.password) {
            return res.status(400).json({
                status: 'fail',
                message: "Please provide all the necessary information"
            })
        }
        const user = await getUser(loginInfo.email);
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: "No user found. Create new account."
            })
        }
        const comparePasswordResult = user.comparePassword(loginInfo.password, user.password);

        if (!comparePasswordResult) {
            return res.status(400).json({
                status: 'fail',
                message: "Wrong Password, try again."
            })
        }

        user.password = undefined;
        const token = generateToken(user);
        res.status(200).json({
            status: 'success',
            message: "User fetched successfully!",
            data: user,
            token
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't create the user!",
            error
        })
    }
}
exports.meController = async (req, res) => {
    try {
        const email = req.decoded.email;
        const user = await getUser(email);
        user.password = undefined;
        res.status(200).json({
            status: 'success',
            message: "User fetched successfully!",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't create the user!",
            error
        })
    }
}