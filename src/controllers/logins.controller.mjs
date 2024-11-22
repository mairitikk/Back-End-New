import LofinModel from '../models/login.model.mjs';

// GET /api/todos
const getAllLogins = async (req, res) => {
    try {
        const result = await LoginModel.selectAllLogins();


        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const createLogin = async (req, res) => {
    try {
        const loginData = { login: req.body.login };
        const newLoginId = await LoginModel.insertLogin(loginData);
        res.status(201).json({ id: newLoginId }); // Send the inserted ID as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create login' });
    }
};

const updateLogin = async (req, res) => {
    try {
        console.log(req.body)
        const { loginId } = req.params;
        const updatedLogin = await LoginModel.updateLogin(loginId, req.body);
        res.json(updatedLogin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLogin = async (req, res) => {
    try {
        await LoginModel.deleteLogin(req.params.id);
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllLogins, createLogin, updateLogin, deleteLogin };