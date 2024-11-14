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

const createUser = (req, res) => {
    res.send('se crea user');
}
const updateUser = (req, res) => {
    res.send('se actualiza user');
}
const deleteUser = (req, res) => {
    res.send('se elimina user');
}

export { getAllUsers, createUser, updateUser, deleteUser };