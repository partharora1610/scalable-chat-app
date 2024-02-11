"use strict";
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
exports.RateLimiter = void 0;
const redis_1 = __importDefault(require("../redis"));
const RateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.ip;
    const response = yield redis_1.default.multi().incr(ip).expire(ip, 60).exec();
    // type gaurd
    if (!response) {
        return res.status(429).json({ message: "Too many requests" });
    }
    console.log(response);
    // TODO => CHNAGE THE TYPE
    if (response[0][1] > 10) {
        return res.status(429).json({ message: "THAM JAA BHAII!! ARAAM SE" });
    }
    next();
});
exports.RateLimiter = RateLimiter;
