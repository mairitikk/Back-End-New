import TodoModel from '../models/todo.model.mjs';

// GET /api/todos
const getAllTodos = async (req, res) => {
    const [result] = await TodoModel.selectAllTodos();
    console.log(result)

    res.json(result)
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