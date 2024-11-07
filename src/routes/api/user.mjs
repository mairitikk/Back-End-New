
import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../controllers/users.controller.mjs';

const router = express.Router();


// Define your todo routes here
router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);


export default router;