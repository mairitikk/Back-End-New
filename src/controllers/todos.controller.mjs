import pool from "../config/db.mjs";

const getAllTodos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM to_do_db.todo');
        res.send(rows);
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