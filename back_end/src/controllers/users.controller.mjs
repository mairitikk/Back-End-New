import User from '../models/user.model.mjs';
import createToken from '../helpers/utils.mjs';
import nodemailer from 'nodemailer';
import { createActivationToken, generateActivationSecret } from './activation.mjs';




export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return { success: false, status: 400, message: "All fields are required." };
        }

        if (password.length < 6) {
            return { success: false, status: 400, message: "Password must be at least 6 characters." };
        }

        const newUser = new User({ name, email, password }); // Create User instance

        const activationToken = createActivationToken(newUser._id);
        const activationSecret = generateActivationSecret();

        newUser.activationToken = activationToken; // Assign to the user object
        newUser.activationSecret = activationSecret; // Assign to the user object

        await newUser.save(); // Save the user *after* generating and setting the tokens

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Registration Confirmed',
            html: `<p>Hi ${newUser.name},</p><p>Thank you for registering!</p><p>Click here to activate your account: <a href="${process.env.FRONTEND_URL}/activate?token=${activationToken}">Activate</a></p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return { success: true, status: 201, message: 'Registration successful! Check your email to activate your account.' };
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Consider if you want to delete the user if email sending fails.
            // If you delete the user, you should also handle the case where the email sending fails and the user tries to register again
            // with the same email.
            return { success: true, status: 200, message: 'Registration successful, but there was an error sending the confirmation email. Please try again later.' };
        }
    } catch (error) {
        console.error('Registration error:', error);

        if (error.code === 11000 && error.name === 'MongoError') {
            return { success: false, status: 400, message: "Email already exists." };
        }

        return { success: false, message: 'Registration failed. Please try again later.' };
    }
};




/*const register = async (req, res) => {

    try {
        const newUserId = await User.create(req.body);
        res.status(201).json({ id: newUserId }); // Send the inserted ID as a response
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
}
    */

// GET /api/users

const getAllUsers = async (req, res) => {
    try {
        const result = await User.selectAllUsers();
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const updateUser = async (req, res) => {
    try {

        const { userId } = req.params;
        const updatedUser = await User.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await User.deleteUser(userId);
        if (deleted) {
            res.status(204).send(); // No Content response for successful deletion
        } else {
            res.status(404).json({ error: 'User not found' }); // Handle non-existent user
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use findByEmailAndPassword for combined email and password verification
        const user = await User.findByEmailAndPassword(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token using createToken
        const token = createToken(user.id);

        res.json({ success: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { getAllUsers, updateUser, deleteUser, register, login };



