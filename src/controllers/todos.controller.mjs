import TodoModel from '../models/todo.model.mjs';

// GET /api/todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await TodoModel.findAll();
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};




const createTodo = (req, res) => {
    res.send('se crea todo');
}
const updateTodo = (req, res) => {
    res.send('se actualiza todo');
}
const deleteTodo = (req, res) => {
    res.send('se elimina todo');
}

export { getAllTodos, createTodo, updateTodo, deleteTodo };