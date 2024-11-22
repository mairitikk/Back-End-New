import express from 'express';
import todoRoutes from './api/todo.mjs';
import userRoutes from './api/user.mjs'
import loginRoutes from './api/login.mjs'

const router = express.Router();

router.use('/todo', todoRoutes);
router.use('/user', userRoutes);
router.use('/login', loginRoutes);


export default router;
