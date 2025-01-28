import TodoModel from '../models/todo.model.mjs';

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
    try {
        const userId = req.userId;
        const { title } = req.body;
        const newTodoData = { title, completed: false, user_id: userId };

        const newTodoId = await TodoModel.insertTodo(newTodoData);
        res.status(201).json({ id: newTodoId });

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
        const userId = req.userId;
        const { todoId } = req.params;
        const todoData = { title: req.body.title, completed: req.body.completed, user_id: userId };

        // Check if the todo belongs to the current user
        await TodoModel.deleteTodo(todoId, todoData);
        res.json({ message: 'Todo updated successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };