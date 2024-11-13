import db from '../config/db.mjs';


const selectAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM todo');
    return rows;
};
const insertTodo = ({ to_do }) => {
    return db.query('INSERT INTO todo(to_do) VALUES()');
}


export default { selectAllTodos, insertTodo };