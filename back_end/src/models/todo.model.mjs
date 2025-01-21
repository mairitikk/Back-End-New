import db from '../config/db.mjs';

const selectAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM todo');
    return rows;
};

const insertTodo = async ({ title, user_id }) => {
    try {
        const [result] = await db.query('INSERT INTO todo(title, completed, user_id) VALUES (?,false, ?)', [title, user_id]);
        const insertId = result.insertId;
        return insertId;
    } catch (error) {
        console.error('Error inserting todo:', error);
        throw error;
    }
};

const updateTodo = async (id, { title, completed }) => {
    try {
        const [result] = await db.query('UPDATE todo SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
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