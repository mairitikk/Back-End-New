import TodoModel from '../models/todo.model.mjs';
import { AES, enc } from 'crypto-js';
// GET /api/todos
const getAllTodos = async (req, res) => {
    try {

        const userId = req.userId;
        const result = await TodoModel.selectAllTodos(userId);
        res.json(result);
    } catch (error) {
        console.error('Error retrieving todos:', error.message);
        res.status(500).json({ error: 'Failed to retrieve todos', details: error.message })
    }
};

const createTodo = async (req, res) => {
    const encryptedTitle = req.body.title; // Encrypted title from the client
    const secretKey = process.env.SECRET_KEY; // From environment variables (Base64 encoded)
    const iv = process.env.IV;       // From environment variables (Base64 encoded)

    if (!secretKey || !iv) {
        console.error("Missing secret key or IV");
        return res.status(500).json({ error: "Internal server error" }); // Don't reveal too much
    }
    try {

        const bytes = AES.decrypt(encryptedTitle, secretKey, { iv: enc.Utf8.parse(iv) });
        const decryptedTitle = bytes.toString(enc.Utf8);
        // Or const decryptedTitle = decrypt(encryptedTitle); if you implemented the decrypt function.

        const userId = req.userId;



        const newTodoData = { title: req.body.title, completed: false, user_id: userId };

        const newTodoId = await TodoModel.insertTodo(newTodoData);
        res.status(201).json({ id: newTodoId });
        console.log(newTodoId)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const userId = req.userId;
        const { todoId } = req.params;
        const todoData = { title: req.body.title, completed: req.body.completed, user_id: userId };
        await TodoModel.updateTodo(todoId, todoData);

        res.json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {

        const { todoId } = req.params;

        await TodoModel.deleteTodo(todoId);
        res.status(200).json({ message: 'Todo deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };