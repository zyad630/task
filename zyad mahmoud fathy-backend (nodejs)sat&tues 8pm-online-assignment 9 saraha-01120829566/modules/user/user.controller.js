import { userModel } from './user.model.js';
import bcrypt from 'bcrypt';
import { encryptPhone } from '../../utils/crypto.js';
import { generateToken } from '../../utils/token.js';
import { asyncHandler } from '../../utils/errorHandling.js';

export const signup = asyncHandler(async (req, res, next) => {
    const { userName, email, password, phone, age } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
        return next(new Error("Email already exists", { cause: 409 }));
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND || 8));
    const encryptedPhone = encryptPhone(phone);

    const user = await userModel.create({
        userName,
        email,
        password: hashPassword,
        phone: encryptedPhone,
        age
    });

    return res.status(201).json({ message: "User registered successfully", user });
});

export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new Error("Invalid email or password", { cause: 404 }));
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        return next(new Error("Invalid email or password", { cause: 400 }));
    }

    const token = generateToken({
        payload: { id: user._id, email: user.email, role: user.role }
    });

    return res.status(200).json({ message: "Login successful", token: `Bearer ${token}` });
});
