import UserModel from '../models/user.model.mjs';
import createToken from '../helpers/utils.mjs';
import nodemailer from 'nodemailer';
import { createActivationToken, generateActivationSecret } from '../helpers/activation.mjs';




const register = async (req, res) => { // <-- Use res to send responses
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
        }

        // --- THE FIX IS HERE ---
        // Call the 'create' function exported from your model file
        // It will handle the database insertion for you.
        const newUser = await UserModel.create({ name, email, password });
        // NOTE: Your 'create' function in the model returns a user object, which is good.

        // Now, you can add the activation tokens to the returned user object
        // and then update the database.
        const activationToken = createActivationToken(newUser.id); // Use the returned user's ID
        const activationSecret = generateActivationSecret();

        // --- UPDATE THE USER WITH THE TOKENS ---
        // Your model has an `updateUser` function. Use it here.
        await UserModel.updateUser(newUser.id, {
            activationToken: activationToken,
            activationSecret: activationSecret
        });

        // The rest of your code for sending emails and sending responses can remain.
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
            html: `<p>Hi ${name},</p><p>Thank you for registering!</p><p>Click here to activate your account: <a href="${process.env.FRONTEND_URL}/activate?token=${activationToken}">Activate</a></p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(201).json({ success: true, message: 'Registration successful! Check your email to activate your account.' });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return res.status(500).json({ success: false, message: 'Registration successful, but there was an error sending the confirmation email. Please try again later.' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        // Handle duplicate email error
        if (error.code === 'ER_DUP_ENTRY') { // MySQL specific error code for duplicate entry
            return res.status(400).json({ success: false, message: "Email already exists." });
        }
        return res.status(500).json({ success: false, message: 'Registration failed. Please try again later.' });
    }
};

// GET /api/users

// New (correct)
const getAllUsers = async (req, res) => {
    try {
        const result = await UserModel.selectAllUsers(); // <-- Changed from User to UserModel
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await UserModel.updateUser(userId, req.body); // <-- Changed from User to UserModel
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await UserModel.deleteUser(userId); // <-- Changed from User to UserModel
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use findByEmailAndPassword for combined email and password verification
        const user = await UserModel.findByEmailAndPassword(email, password); // <-- Changed from User to UserModel

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



