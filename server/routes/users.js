// User routes and controllers
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../models/database');
const auth = require('./auth');
const bcryptjs = require('bcryptjs');

// ============================================
// GET CURRENT USER PROFILE
// ============================================

router.get('/profile', auth.authenticateToken, async (req, res) => {
    try {
        const user = await dbAsync.get(
            'SELECT id, name, email, category, created_at, updated_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch profile'
        });
    }
});

// ============================================
// UPDATE USER PROFILE
// ============================================

router.put('/profile', auth.authenticateToken, [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('category').optional().trim()
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

        const { name, category } = req.body;
        const userId = req.user.id;

        // Update profile
        const result = await dbAsync.run(
            'UPDATE users SET name = COALESCE(?, name), category = COALESCE(?, category), updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name || null, category || null, userId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update profile'
        });
    }
});

// ============================================
// CHANGE PASSWORD
// ============================================

router.post('/change-password', auth.authenticateToken, [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
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

        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        // Get user
        const user = await dbAsync.get(
            'SELECT password FROM users WHERE id = ?',
            [userId]
        );

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Check current password
        const validPassword = await bcryptjs.compare(currentPassword, user.password);

        if (!validPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Current password is incorrect'
            });
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        // Update password
        await dbAsync.run(
            'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [hashedPassword, userId]
        );

        res.json({
            status: 'success',
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to change password'
        });
    }
});

// ============================================
// GET USER BY ID (PUBLIC)
// ============================================

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await dbAsync.get(
            'SELECT id, name, category, created_at FROM users WHERE id = ?',
            [id]
        );

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch user'
        });
    }
});

module.exports = router;
