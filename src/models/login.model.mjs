import db from '../config/db.mjs';

const selectAllLogins = async () => {
    const [rows] = await db.query('SELECT * FROM login');
    return rows;
};
const insertLogin = async ({ login }) => {
    try {
        const [result] = await db.query('INSERT INTO login(login) VALUES (?)', [login]);
        const insertId = result.insertId;
        return insertId;
    } catch (error) {
        console.error('Error inserting login:', error);
        throw error;
    }

};

const updateLogin = async (id, { login }) => {
    try {
        const [result] = await db.query('UPDATE todo SET login = ? WHERE id = ?', [login, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating login:', error);
        throw error;
    }
};
const deleteLogin = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM login WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting login:', error);
        throw error;
    }
};




export default { selectAllLogins, insertLogin, updateLogin, deleteLogin };