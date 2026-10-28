
import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "User already registered"
        });
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const accessToken = jwt.sign(
        { id: newUser._id },
        config.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: newUser._id },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    return res.status(201).json({
        message: "User Registered Successfully",
        user: {
            username: newUser.username,
            email: newUser.email
        },
        accessToken
    });
}

export async function getMe(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access token not found"
        });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "User fetched successfully",
        user: {
            username: user.username,
            email: user.email
        }
    });
}
