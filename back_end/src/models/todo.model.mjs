import db from '../config/db.mjs';

const selectAllTodos = async (user_id) => {
    try {
        const secretKey = process.env.DB_ENCRYPTION_KEY; // Get from environment variables (Base64 encoded if needed)

        if (!secretKey) {
            throw new Error("Encryption key is missing");
        }

        const [rows] = await db.query(
            "SELECT id, AES_DECRYPT(title, ?) AS title, completed, user_id FROM todo WHERE user_id = ?",
            [secretKey, user_id]
        );
        // Handle potential NULL values from decryption:
        const decryptedRows = rows.map(row => ({
            ...row,
            title: row.title === null ? null : row.title.toString(), // Convert Buffer to string if not null
        }));

        return decryptedRows;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

const insertTodo = async ({ title, completed = false, user_id }) => {

    try {
        const secretKey = process.env.DB_ENCRYPTION_KEY;

        if (!secretKey) {
            throw new Error("Encryption key is missing");
        }
        const [result] = await db.query(
            'INSERT INTO todo(title, completed, user_id) VALUES (AES_ENCRYPT(?, ?), ?, ?)',
            [title, secretKey, completed, user_id] // Encrypt title with secretKey
        );


        // Check if `result` and `insertId` exist before accessing them
        if (result && result.insertId) {
            const insertId = result.insertId;
            return insertId;
        } else {
            throw new Error('No insertId returned from database query');
        }
    } catch (error) {
        console.error('Error inserting todo:', error);
        throw error;
    }
};

const updateTodo = async (id, { title, completed = false, user_id }) => {

    try {
        const [result] = await db.query('UPDATE todo SET title = ?, completed = ? WHERE id = ? AND user_id = ?', [title, completed, id, user_id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};
const deleteTodo = async (id) => {
    try {
        const [result] = await db.query(
            'DELETE FROM todo WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Todo not found.');
        }

        return true;

    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};




export default { selectAllTodos, insertTodo, updateTodo, deleteTodo };