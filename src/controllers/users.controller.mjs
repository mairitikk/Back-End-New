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
const updateUser = async (req, res) => {
    try {

        const { userId } = req.params;
        const updatedUser = await UserModel.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = (req, res) => {
    res.send('se elimina user');
}

export { getAllUsers, createUser, updateUser, deleteUser };