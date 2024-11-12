import db from '../config/db.mjs';
const selectAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM todo');
    return rows;
};

export default { selectAllTodos };