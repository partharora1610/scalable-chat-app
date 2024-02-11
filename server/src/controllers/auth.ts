import { Request, Response } from "express";
import * as z from "zod";
import bycrptjs from "bcryptjs";
import { db } from "../db";

const loginFormSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(8).max(255),
});

const registerFormSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(8).max(255),
  username: z.string().min(2).max(255),
});

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const formData = { email, password };

    loginFormSchema.parse(formData);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const correct = await bycrptjs.compare(password, existingUser.password);

    if (!correct) {
      return res
        .status(400)
        .json({ message: "Incorrect credentials entered by the user" });
    }

    req.session.user = {
      username: existingUser.username,
      id: existingUser.id,
    };

    res.status(200).json({
      message: "User signed in successfully",
      status: "success",
      user: existingUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, name, confirmPassword } = req.body;

    const formData = { email, password, username };

    registerFormSchema.parse(formData);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bycrptjs.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name,
      },
    });

    req.session.user = {
      username,
      id: newUser.id,
    };

    res.status(200).json({
      message: "User created successfully",
      status: "success",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
