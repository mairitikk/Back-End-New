import TodoModel from '../models/todo.model.mjs';

// GET /api/todos
const getAllTodos = async (req, res) => {
    try {
        const result = await TodoModel.selectAllTodos();


        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const newTodo = await TodoModel.createTodo(req.body.todo);
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await TodoModel.updateTodo(req.params.id, req.body);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        await TodoModel.deleteTodo(req.params.id);
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };