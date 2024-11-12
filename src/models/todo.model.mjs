import db from '../config/db.mjs';
const selectAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM alumnos');
    return rows;
};

export default { selectAllTodos };