import { messageModel } from './message.model.js';
import { userModel } from '../modules/user/user.model.js';
import { asyncHandler } from '../../utils/errorHandling.js';

export const sendMessage = asyncHandler(async (req, res, next) => {
    const { receiverId } = req.params;
    const { content } = req.body;

    const user = await userModel.findById(receiverId);
    if (!user) {
        return next(new Error("Receiver not found", { cause: 404 }));
    }

    const message = await messageModel.create({
        content,
        receiverId
    });

    return res.status(201).json({ message: "Message sent successfully", message });
});

export const getUserMessages = asyncHandler(async (req, res, next) => {
    const messages = await messageModel.find({ receiverId: req.user._id });

    return res.status(200).json({ message: "Done", messages });
});
