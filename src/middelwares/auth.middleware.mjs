import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'you need authorization' });
    }
    const token = req.headers['authorization'];


    next();
};

export default checkToken;