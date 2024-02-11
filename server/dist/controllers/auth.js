"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Login = void 0;
const z = __importStar(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const loginFormSchema = z.object({
    email: z.string().email().min(5).max(255),
    password: z.string().min(8).max(255),
});
const registerFormSchema = z.object({
    email: z.string().email().min(5).max(255),
    password: z.string().min(8).max(255),
    username: z.string().min(2).max(255),
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const formData = { email, password };
        loginFormSchema.parse(formData);
        const existingUser = yield db_1.db.user.findUnique({
            where: { email },
        });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });
        const correct = yield bcryptjs_1.default.compare(password, existingUser.password);
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
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.Login = Login;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, name, confirmPassword } = req.body;
        const formData = { email, password, username };
        registerFormSchema.parse(formData);
        const existingUser = yield db_1.db.user.findUnique({
            where: { email },
        });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield db_1.db.user.create({
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
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.Register = Register;
