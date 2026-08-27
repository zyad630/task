import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
}, {
    timestamps: true
});

export const userModel = model('User', userSchema);
