import LoginModel from '../models/login.model.mjs';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newLoginId = await LoginModel.login(email, password);
        res.status(201).json({ id: newLoginId }); // Send the inserted ID as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create login' });
    }
};


export { login };