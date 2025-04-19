import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findAllUsers, findUserByEmail } from "../models/user";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: "Incorrect password" });
    }

    const payload = {
      user_id: user.id,
      role_type: user.role_type,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: process.env.JWT_EXPIRE_TIME || "1h",
    });

    return res.status(200).json({
      status: 200,
      message: "Logged in",
      result: {
        user_id: user.id,
        access_token,
        token_type: "Bearer",
        role_type: user.role_type,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json({
      status: 200,
      message: "Fetched Users",
      result: {
        data: users,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};
