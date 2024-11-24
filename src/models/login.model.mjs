import db from '../config/db.mjs';


const login = async ({ email, password }) => {
    try {
        const [result] = await db.query('Select id from login where email=? and password= ?', [email, password]);
        return result;
    } catch (error) {
        console.error('Error login:', error);
        throw error;
    }

};
export default { login };