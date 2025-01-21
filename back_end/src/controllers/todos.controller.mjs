import TodoModel from '../models/todo.model.mjs';

// GET /api/todos
const getAllTodos = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await TodoModel.selectAllTodos(userId);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const todoData = { title: req.body.title, user_id: userId };
        const newTodoId = await TodoModel.insertTodo(todoData);
        res.status(201).json({ id: newTodoId }); // Send the inserted ID as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todoData = { title: req.body.title, completed: req.body.completed }; // Extract the completed state from the request body

        await TodoModel.updateTodo(todoId, todoData); // Update the completed state in the database

        res.json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        await TodoModel.deleteTodo(todoId);
        res.status(200).json({ message: 'Todo deleted successfully' }); // Send a success message

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };