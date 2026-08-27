import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'secretKey123', 'salt', 32);
const iv = Buffer.alloc(16, 0);

export const encryptPhone = (phone) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(phone, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

export const decryptPhone = (encryptedPhone) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedPhone, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
