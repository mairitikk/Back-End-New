import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

async function checkToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, secret);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
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