// Authentication routes and controllers
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../models/database');

const JWT_SECRET = process.env.JWT_SECRET || 'inspresso-secret-key-2025';

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access token required'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
};

// ============================================
// REGISTER ENDPOINT
// ============================================

router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('category').optional().trim()
], async (req, res) => {
    try {
        // Check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { name, email, password, category } = req.body;

        // Check if email already exists
        const existingUser = await dbAsync.get(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create user
        const result = await dbAsync.run(
            'INSERT INTO users (name, email, password, category) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, category || null]
        );

        // Generate token
        const token = jwt.sign(
            { id: result.lastID, email, name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            token,
            user: {
                id: result.lastID,
                name,
                email,
                category
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Registration failed'
        });
    }
});

// ============================================
// LOGIN ENDPOINT
// ============================================

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await dbAsync.get(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Check password
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            status: 'success',
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                category: user.category
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Login failed'
        });
    }
});

// ============================================
// VERIFY TOKEN ENDPOINT
// ============================================

router.post('/verify', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        message: 'Token is valid',
        user: req.user
    });
});

// ============================================
// LOGOUT ENDPOINT
// ============================================

router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // In a real app, you would invalidate the token in the database
        res.json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Logout failed'
        });
    }
});

// Export middleware for use in other routes
router.authenticateToken = authenticateToken;

module.exports = router;
