const User = require('../model/userModel');
const Otp = require('../model/otpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(300).json({
                success: false,
                message: "Email is Required"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(300).json({
                success: false,
                message: "User Already Registered to this Platform, Please try Login"
            })
        }

        const otpValue = Math.floor(100000 + Math.random() * 900000);

        const existingOtp = await Otp.findOne({ email });

        if (existingOtp) {
            existingOtp.otp = otpValue;
            await existingOtp.save();
        }
        else {
            const otpNew = await Otp.create({
                email, otp: otpValue
            });
        }

        return res.status(200).json({
            success: true,
            message: "Otp Sent Successfully",
            otp: otpValue
        })
    }
    catch (e) {
        console.log(e.message);
    }
}

exports.createUser = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password, role, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !role || !otp) {
            return res.status(300).json({
                success: false,
                message: "Email is Required"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(300).json({
                success: false,
                message: "User Already Registered to this Platform, Please try Login"
            })
        }

        const existingOtp = await Otp.findOne({ email });

        if (existingOtp.otp != otp) {
            return res.status(300).json({
                success: false,
                message: "OTP is Invalid"
            })
        }

        const hassedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            middleName,
            lastName,
            email,
            password: hassedPassword,
            role
        });

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user
        })

    }
    catch (e) {
        console.log(e.message);
    }

}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(300).json({
                success: false,
                message: "Email is Required"
            })
        }

        const existingUser = await User.findOne({ email }).select('+password');

        if (!existingUser) {
            return res.status(300).json({
                success: false,
                message: "User Not Found, Try Signup"
            })
        }

        const comparePassword = await bcrypt.compare(password, existingUser.password);

        if (!comparePassword) {
            return res.status(200).json({
                success: false,
                message: "Password is Incorrect"
            })
        }

        const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            message: "User Login Successfully",
            token,
            role: existingUser.role
        })
    }
    catch (e) {
        console.log(e.message);
    }

}