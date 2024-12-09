
import express from 'express';
import { getAllUsers, updateUser, deleteUser, register, login } from '../../controllers/users.controller.mjs';

const router = express.Router();


// Define your todo routes here
router.get('/', getAllUsers);
router.post('/register', register);
router.get('/login', login)
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);


export default router;