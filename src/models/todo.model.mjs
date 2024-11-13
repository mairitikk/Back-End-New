import db from '../config/db.mjs';


const selectAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM todo');
    return rows;
};
const insertTodo = () => {


}

export default { selectAllTodos, insertTodo };