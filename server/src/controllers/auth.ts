import { Request, Response } from "express";
import bycrptjs from "bcryptjs";
import { db } from "../db";
import { v4 as uuidv4 } from "uuid";
import { loginFormSchema, registerFormSchema } from "../utils/validation";

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
      userId: existingUser.userId,
    };

    res.status(200).json({
      loggedIn: true,
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

    const userId = uuidv4();

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        userId,
        username,
        name,
      },
    });

    req.session.user = {
      username,
      userId: newUser.userId,
    };

    res.status(200).json({
      loggedIn: true,
      status: "success",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const isUserLoggedIn = async (req: Request, res: Response) => {
  try {
    if (req.session.user && req.session.user.username) {
      return res.status(200).json({
        loggedIn: true,
        username: req.session.user.username,
      });
    }

    res.status(200).json({ loggedIn: false });
  } catch (error) {
    res.status(400).json({ error });
  }
};
