import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.mjs';

const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'you need authorization' });
    }
    const token = req.headers['authorization'];
    //comprobar si el token es valido
    let payload
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(403).json({ fatal: error.message });
    }

    //Recuperar el user que realiza la peticion

    userModel.findById()
    next();
};

export default checkToken;