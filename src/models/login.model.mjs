import db from '../config/db.mjs';



const findByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM login WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('Error finding user:', error);
        throw new Error('Failed to find user');
    }
};

export default { findByEmail };
