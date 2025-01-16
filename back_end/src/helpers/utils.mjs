import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';


const createToken = (userId) => {
    const payload = {
        userId,
        exp_at: dayjs().add(1, 'day').unix()
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default createToken;