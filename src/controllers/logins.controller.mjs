/*import LoginModel from '../models/login.model.mjs';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newLoginId = await LoginModel.login(email, password);
        if (newLoginId.length > 0) {
            res.json({ message: 'Login successful', newLoginId });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create login' });
    }
};


export { login };*/

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import LoginModel from '../models/login.model.mjs';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await LoginModel.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
                expiresIn:
                    '1h'
            });

            res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { login };