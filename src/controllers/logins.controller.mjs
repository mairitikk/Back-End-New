import LoginModel from '../models/login.model.mjs';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newLoginId = await LoginModel.login(email, password);
        if (newLoginId) {
            res.json({ message: 'Login successful', newLoginId });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create login' });
    }
};


export { login };