import db from '../config/db.mjs';


const login = async ({ email, password }) => {
    try {
        const [result] = await db.query('INSERT INTO login(login) VALUES (?)', [login]);
        const insertId = result.insertId;
        return insertId;
    } catch (error) {
        console.error('Error inserting login:', error);
        throw error;
    }

};
export default { login };