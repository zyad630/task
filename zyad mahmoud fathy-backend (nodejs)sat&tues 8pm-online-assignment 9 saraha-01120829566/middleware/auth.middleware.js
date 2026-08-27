import { verifyToken } from '../utils/token.js';
import { userModel } from '../modules/user/user.model.js';
import { asyncHandler } from '../utils/errorHandling.js';

export const auth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new Error("In-valid Bearer key", { cause: 400 }));
    }

    const token = authorization.split('Bearer ')[1];
    if (!token) {
        return next(new Error("In-valid token", { cause: 400 }));
    }

    const decoded = verifyToken({ token });
    if (!decoded || !decoded.id) {
        return next(new Error("In-valid token payload", { cause: 400 }));
    }

    const user = await userModel.findById(decoded.id).select('userName email role');
    if (!user) {
        return next(new Error("Not registered account", { cause: 401 }));
    }

    req.user = user;
    next();
});
