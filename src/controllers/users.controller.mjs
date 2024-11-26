import UserModel from '../models/user.model.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async (req, res) => {

    try {
        const newUserId = await UserModel.create(req.body);
        res.status(201).json({ id: newUserId }); // Send the inserted ID as a response
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
}

// GET /api/users

const getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.selectAllUsers();
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const updateUser = async (req, res) => {
    try {

        const { userId } = req.params;
        const updatedUser = await UserModel.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await UserModel.deleteUser(userId);
        if (deleted) {
            res.status(204).send(); // No Content response for successful deletion
        } else {
            res.status(404).json({ error: 'User not found' }); // Handle non-existent user
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compareSync(password, user.password);

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

export { getAllUsers, updateUser, deleteUser, register, login };