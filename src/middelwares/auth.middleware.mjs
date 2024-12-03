const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'you need authorization' });
    }

    // ... rest of your token validation logic ...

    next();
};

export default checkToken;