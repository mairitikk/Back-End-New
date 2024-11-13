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

const updateTodo = async ({ id, to_do }) => {
    try {
        const [result] = await db.query('UPDATE todo SET todo = ? WHERE id = ?', [to_do, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};
const deleteTodo = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM todo WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};




export default { selectAllTodos, insertTodo, updateTodo, deleteTodo };