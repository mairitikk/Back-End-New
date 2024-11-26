import express from 'express';
import todoRoutes from './api/todo.mjs';
import userRoutes from './api/user.mjs'


const router = express.Router();

router.use('/todo', todoRoutes);
router.use('/user', userRoutes);
;


export default router;
