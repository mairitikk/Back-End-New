import db from '../config/db.mjs';

const selectAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM user');
    return rows;
};
const insertUser = async ({ name, email }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO user(name, email) VALUES (?, ?)',
            [name, email]
        );
        const insertId = result.insertId;
        return insertId;
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
};

const updateUser = async (id, { user }) => {
    try {
        const [result] = await db.query('UPDATE user SET user = ? WHERE id = ?', [user, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
const deleteUser = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM user WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};




export default { selectAllUsers, insertUser, updateUser, deleteUser };