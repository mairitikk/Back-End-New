import db from '../config/db.mjs';

const selectAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM todo');
    return rows;
};
const insertTodo = async ({ to_do }) => {
    try {
        const [result] = await db.query('INSERT INTO todo(todo) VALUES (?)', [to_do]);
        const insertId = result.insertId;
        return insertId;
    } catch (error) {
        console.error('Error inserting todo:', error);
        throw error;
    }
};


export default { selectAllTodos, insertTodo };