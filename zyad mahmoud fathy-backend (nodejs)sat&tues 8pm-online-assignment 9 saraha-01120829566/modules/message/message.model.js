import { Schema, model, Types } from 'mongoose';

const messageSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Message content is required'],
        trim: true
    },
    receiverId: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver ID is required']
    }
}, {
    timestamps: true
});

export const messageModel = model('Message', messageSchema);
