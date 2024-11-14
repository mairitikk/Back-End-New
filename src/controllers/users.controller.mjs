import UserModel from '../models/user.model.mjs';

// GET /api/users

const getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.selectAllUsers();
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const userData = { to_do: req.body.todo };
        const newUserId = await UserModel.insertUser(userData);
        res.status(201).json({ id: newUserId }); // Send the inserted ID as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
const updateUser = (req, res) => {
    res.send('se actualiza user');
}
const deleteUser = (req, res) => {
    res.send('se elimina user');
}

export { getAllUsers, createUser, updateUser, deleteUser };