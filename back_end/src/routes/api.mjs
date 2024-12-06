import express from 'express';
import todoRoutes from './api/todo.mjs';
import userRoutes from './api/user.mjs'
import checkToken from '../middelwares/auth.middleware.mjs';


const router = express.Router();

router.use('/todo', todoRoutes); //checkToken, todoRoutes);
router.use('/user', userRoutes);


export default router;
