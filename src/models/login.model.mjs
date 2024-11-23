import db from '../config/db.mjs';

const selectAllLogins = async () => {
    const [rows] = await db.query('SELECT * FROM login');
    return rows;
};
const insertLogin = async ({ to_do }) => {
    try {
        const [result] = await db.query('INSERT INTO login(login) VALUES (?)', [login]);
        const insertId = result.insertId;
        return insertId;
    } catch (error) {
        console.error('Error inserting login:', error);
        throw error;
    }

};

const updateTodo = async (id, { todo }) => {
    try {
        const [result] = await db.query('UPDATE todo SET todo = ? WHERE id = ?', [todo, id]);
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