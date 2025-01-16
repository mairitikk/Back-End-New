import User from '../models/user.model.mjs';
import createToken from '../helpers/utils.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = '123456789'

const register = async (req, res) => {

    try {
        const newUserId = await User.create(req.body);
        res.status(201).json({ id: newUserId }); // Send the inserted ID as a response
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
}

// GET /api/users

const getAllUsers = async (req, res) => {
    try {
        const result = await User.selectAllUsers();
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const updateUser = async (req, res) => {
    try {

        const { userId } = req.params;
        const updatedUser = await User.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await User.deleteUser(userId);
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

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



export { getAllUsers, updateUser, deleteUser, register, login }