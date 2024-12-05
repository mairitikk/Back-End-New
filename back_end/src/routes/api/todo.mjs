import express from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../../controllers/todos.controller.mjs';

const router = express.Router();


// Define your todo routes here
router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:todoId', updateTodo);
router.delete('/:todoId', deleteTodo);


export default router;