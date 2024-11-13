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




const createTodo = (req, res) => {
    console.log(req.body)
    res.send('se crea todo');
}
const updateTodo = (req, res) => {
    res.send('se actualiza todo');
}
const deleteTodo = (req, res) => {
    res.send('se elimina todo');
}

export { getAllTodos, createTodo, updateTodo, deleteTodo };