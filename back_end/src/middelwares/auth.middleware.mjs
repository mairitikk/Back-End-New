import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.mjs';

const secret = '123456789'; // Replace with your actual secret key

async function checkToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error('No authorization header or invalid format');
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
        console.log('Received token:', token);

        const decoded = jwt.verify(token, secret);
        console.log('Decoded token:', decoded);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        console.log('Error message:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default checkToken;