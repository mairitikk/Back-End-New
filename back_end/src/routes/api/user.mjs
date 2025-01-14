
import express from 'express';
import { getAllUsers, updateUser, deleteUser, register, login } from '../../controllers/users.controller.mjs';

const router = express.Router();
router.use(checkToken);

// Define your user routes here
router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login)
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);


export default router;