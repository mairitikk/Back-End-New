import User from '../models/user.model.mjs';
import createToken from '../helpers/utils.mjs';
import bcrypt from 'bcrypt'; // Import bcrypt
import { v4 as uuidv4 } from 'uuid'; // For generating activation tokens

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Validate data (Crucial)
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // More thorough validation (example):
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        // ... (Add more checks for email format, etc.)

        // 2. Hash the password (Essential)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Generate activation token
        const activationToken = uuidv4();

        // 4. Store user data in the database (including activation token)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            activationToken: activationToken, // Store the token
            active: false, // Set user as inactive initially
        });

        // 5. Send confirmation email
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
            html: `<p>Hi ${username},</p><p>Thank you for registering!</p><p>Click here to activate your account: <a href="${process.env.FRONTEND_URL}/activate?token=${activationToken}">Activate</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Registration successful! Check your email to activate your account.' });
    } catch (error) {
        console.error('Registration error:', error);

        if (error.code === 11000 && error.name === 'MongoError') {
            return res.status(400).json({ message: "Email already exists." });
        }

        res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
};




const register = async (req, res) => {

    try {
        const newUserId = await User.create(req.body);
        res.status(201).json({ id: newUserId }); // Send the inserted ID as a response
    }
    catch (error) {
        res.json({ fatal: error.message });
    }
}

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

export { getAllUsers, updateUser, deleteUser, register, login, registerUser };



