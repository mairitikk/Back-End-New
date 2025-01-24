import db from '../config/db.mjs';

const selectAllTodos = async (user_id) => {
    console.log('Executing selectAllTodos with user_id:', user_id);
    try {
        const [rows] = await db.query('SELECT id, title, completed, user_id FROM todo WHERE user_id = ?', [user_id]);
        console.log('Retrieved rows:', rows); // Log the retrieved rows
        return rows;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
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

const updateTodo = async (id, { title, completed = false, user_id }) => {
    console.log('Executing selectAllTodos with user_id:', user_id);
    try {
        const [result] = await db.query('UPDATE todo SET title = ?, completed = ? WHERE id = ? AND user_id = ?', [title, completed, id, user_id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};
const deleteTodo = async (id, user_id) => {
    try {
        const [result] = await db.query('DELETE FROM todo WHERE id = ? AND user_id = ?', [id, user_id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};




export default { selectAllTodos, insertTodo, updateTodo, deleteTodo };