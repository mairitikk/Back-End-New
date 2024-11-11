const getAllTodos = (req, res) => {

    db.query('select* from to_do_db.todo')
        .then(() => { })
        .catch((error) => {
            console.log(error)
        });
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