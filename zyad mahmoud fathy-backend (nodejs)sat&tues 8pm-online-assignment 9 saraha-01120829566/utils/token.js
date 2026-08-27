import jwt from 'jsonwebtoken';

export const generateToken = ({ payload = {}, signature = process.env.JWT_SECRET || 'sarahaSecretKey', expiresIn = '1d' } = {}) => {
    return jwt.sign(payload, signature, { expiresIn });
};

export const verifyToken = ({ token = '', signature = process.env.JWT_SECRET || 'sarahaSecretKey' } = {}) => {
    return jwt.verify(token, signature);
};
