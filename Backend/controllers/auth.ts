import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcryptjs");
import jwt, { VerifyErrors } from "jsonwebtoken";
import User, { UserDocument } from "../models/user";

interface AuthRequest extends Request {
  profile?: UserDocument;
  user?: UserDocument;
}

export const register = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        error: "Username is taken!",
      });
    }
    const newUser = new User({ userName, password });
    await newUser.save();
    return res.json({
      message: "Registration success. Please login.",
    });
  } catch (error) {
    console.error("Error saving user in database:", error);
    return res.status(500).json({
      error: "Error saving user in database. Please try again later.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        error: "User with that username does not exist. Please register.",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Username and password do not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      error: "Error during login. Please try again later.",
    });
  }
};

export const requireSignin = (req: AuthRequest, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authUserId = req.user?._id;
    if (!authUserId) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const user = await User.findOne({ _id: authUserId }).exec();
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  } catch (error: any) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
