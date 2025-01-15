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

        const token = authHeader.split(' ')[1];
        console.log('Received token:', token);

        const decoded = jwt.verify(token, secret);
        console.log('Decoded token:', decoded);

        // Use userModel to find the user based on the decoded userId
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            console.error('User not found');
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Attach user information to the request object (optional)
        req.user = user;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        console.log('Error message:', error.message);
        return res.status(403).json({ message: 'Forbidden' });
    }
}

export default checkToken;