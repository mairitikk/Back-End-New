/*import db from '../config/db.mjs';
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

import db from '../config/db.mjs';
import bcrypt from 'bcrypt';

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
        const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [insertId]);
        const newUser = rows[0]; // Access the first element of rows array

        return newUser; // Return the complete user object
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
const findByEmailAndPassword = async (email, password) => {
    try {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null; // User not found
        }

        const user = rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            return user; // Return the user object if password matches
        } else {
            return null; // Password incorrect
        }
    } catch (error) {
        console.error('Error finding user:', error);
        throw new Error('Failed to find user');
    }
};

export default { selectAllUsers, updateUser, deleteUser, findByEmailAndPassword, create };

