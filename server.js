// server.js

const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); // ✅ added

const app = express();

app.use(bodyParser.json()); // JSON body parse karne ke liye

/* ---------------- SECURITY HEADERS ---------------- */
app.use(helmet()); // basic security

// ✅ CSP added
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
        },
    })
);

// ✅ HSTS added
app.use(
    helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
    })
);

/* ---------------- CORS ---------------- */
app.use(cors({
    origin: "http://localhost:3000"
}));

/* ---------------- RATE LIMITING ---------------- */
// General limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// ✅ Strict login limiter
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, try later"
});

/* ---------------- LOGGER SETUP ---------------- */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'security.log' })
    ]
});
logger.info('Application started');

// Temporary users store
const users = [];

/* ---------------- SIGNUP ---------------- */
app.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        logger.warn('Signup failed: Missing fields');
        return res.status(400).send('All fields required');
    }

    if (!validator.isEmail(email)) {
        logger.warn(`Signup failed: Invalid email - ${email}`);
        return res.status(400).send('Invalid email');
    }

    if (!validator.isStrongPassword(password)) {
        logger.warn(`Weak password attempt for email: ${email}`);
        return res.status(400).send('Password too weak');
    }

    const sanitizedEmail = validator.escape(email);
    const sanitizedUsername = validator.escape(username);

    const exists = users.find(u => u.email === sanitizedEmail);
    if (exists) {
        logger.warn(`Signup attempt for existing user: ${sanitizedEmail}`);
        return res.status(400).send('User already exists');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({
            email: sanitizedEmail,
            username: sanitizedUsername,
            password: hashedPassword
        });

        logger.info(`New user registered: ${sanitizedEmail}`);
        res.send('User registered successfully');
    } catch (error) {
        logger.error('Error during signup process');
        res.status(500).send('Server error');
    }
});

/* ---------------- LOGIN ---------------- */
app.post('/login', loginLimiter, async (req, res) => { // ✅ limiter added
    const { email, password } = req.body;

    if (!email || !password) {
        logger.warn('Login failed: Missing fields');
        return res.status(400).send('All fields required');
    }

    const sanitizedEmail = validator.escape(email);
    const user = users.find(u => u.email === sanitizedEmail);

    if (!user) {
        logger.warn(`Login failed: User not found - ${email}`);
        return res.status(400).send('User not found');
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            logger.warn(`Invalid login attempt for: ${email}`);
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign(
            { email: user.email },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        logger.info(`User logged in successfully: ${user.email}`);
        res.send({ token });

    } catch (error) {
        logger.error('Error during login process');
        res.status(500).send('Server error');
    }
});

/* ---------------- AUTH MIDDLEWARE ---------------- */
function auth(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        logger.warn('Access denied: No token provided');
        return res.status(401).send('Access denied');
    }

    try {
        const verified = jwt.verify(token, 'your-secret-key');
        req.user = verified;
        next();
    } catch {
        logger.error('Invalid token used');
        res.status(400).send('Invalid token');
    }
}

/* ---------------- PROTECTED ROUTE ---------------- */
app.get('/profile', auth, (req, res) => {
    logger.info(`Profile accessed by: ${req.user.email}`);
    res.send(`Welcome ${req.user.email}, this is your profile.`);
});

/* ---------------- SERVER ---------------- */
const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
