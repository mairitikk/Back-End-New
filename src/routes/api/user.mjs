
import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../controllers/users.controller.mjs';

const router = express.Router();


// Define your todo routes here
router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);


export default router;