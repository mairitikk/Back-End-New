import db from '../config/db.mjs';
import bcrypt from 'bcrypt';

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

const create = async ({ name, email, password }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO user(name, email, password) VALUES (?, ?, ?)',
            [name, email, bcrypt.hashSync(password, 8)]
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
/*const findByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        console.log('Found user:', rows[0]);
        return rows[0];
    } catch (error) {
        console.error('Error finding user:', error);
        throw new Error('Failed to find user');
    }
};*/
const findByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) {
            throw new Error('Invalid email or password'); // Handle non-existent user
        }

        const validPassword = await bcrypt.compare(password, user.password); // Compare hashed passwords
        if (!validPassword) {
            throw new Error('Invalid email or password'); // Handle password mismatch
        }

        return user;
    } catch (error) {
        console.error('Error finding or authenticating user:', error);
        throw error;
    }
};

export default { selectAllUsers, updateUser, deleteUser, findByEmail, create };