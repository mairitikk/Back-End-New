import db from '../config/db.mjs';

/* import Sequelize from 'sequelize';

const sequelize = new Sequelize('to_do_db', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    logging: false
});

const User = sequelize.define('usersss', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

    }
});

sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    }); */


const selectAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM user');
    return rows;
};
/*const insertUser = async ({ name, email }) => {
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
*/
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

export default { selectAllUsers, updateUser, deleteUser };