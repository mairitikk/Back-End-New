import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const generateActivationSecret = () => {
    return uuidv4();
};

const createActivationToken = (userId) => {
    const activationSecret = generateActivationSecret();

    const payload = {
        userId,
        activationSecret,
        exp_at: dayjs().add(1, 'day').unix(),
        type: 'activation'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export { createActivationToken, generateActivationSecret };