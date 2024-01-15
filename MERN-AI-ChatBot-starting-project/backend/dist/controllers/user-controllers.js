import User from "../models/User.js";
import { hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //users signup 
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
const token = createToken(user._id.toString(), user.email, "7d");
const expires = new Date();
expires.setDate(expires.getDate() + 7);
res.cookie("auth_token", token, {
    path: "/",
    domain: "localhost",
    expires,
    httpOnly: true,
    signed: true,
});
//# sourceMappingURL=user-controllers.js.map