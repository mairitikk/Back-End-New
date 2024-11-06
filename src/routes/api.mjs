import express from 'express';
import todoRoutes from './api/todo.mjs';

const router = express.Router();

router.use('/todo', todoRoutes)

export default router;
