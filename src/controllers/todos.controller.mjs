const getAllTodos = (req, res) => {
    res.send('Funcsiona');
}

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