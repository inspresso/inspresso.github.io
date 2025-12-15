// Comments routes and controllers
const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { dbAsync } = require('../models/database');
const auth = require('./auth');

// ============================================
// GET COMMENTS FOR A BLOG
// ============================================

router.get('/blog/:blogId', [
    param('blogId').isInt().withMessage('Valid blog ID is required')
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

        const { blogId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Get total count
        const countResult = await dbAsync.get(
            'SELECT COUNT(*) as total FROM comments WHERE blog_id = ? AND approved = 1',
            [blogId]
        );
        const total = countResult.total;

        // Get comments
        const comments = await dbAsync.all(
            'SELECT id, name, email, text, created_at FROM comments WHERE blog_id = ? AND approved = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [blogId, limit, offset]
        );

        res.json({
            status: 'success',
            data: comments,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch comments'
        });
    }
});

// ============================================
// POST COMMENT
// ============================================

router.post('/', [
    body('blog_id').isInt().withMessage('Valid blog ID is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('text').trim().notEmpty().withMessage('Comment text is required').isLength({ min: 5 }).withMessage('Comment must be at least 5 characters')
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

        const { blog_id, user_id, name, email, text } = req.body;

        // Check if blog exists
        const blog = await dbAsync.get(
            'SELECT id FROM blogs WHERE id = ?',
            [blog_id]
        );

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Add comment (auto-approved for now, in real app would need moderation)
        const result = await dbAsync.run(
            'INSERT INTO comments (blog_id, user_id, name, email, text, approved) VALUES (?, ?, ?, ?, ?, 1)',
            [blog_id, user_id || null, name, email, text]
        );

        res.status(201).json({
            status: 'success',
            message: 'Comment posted successfully',
            comment: {
                id: result.lastID,
                name,
                email,
                text,
                created_at: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Post comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to post comment'
        });
    }
});

// ============================================
// UPDATE COMMENT (OWNER ONLY)
// ============================================

router.put('/:id', auth.authenticateToken, [
    body('text').trim().notEmpty().withMessage('Comment text is required')
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

        const { id } = req.params;
        const { text } = req.body;

        // Check if comment exists
        const comment = await dbAsync.get(
            'SELECT * FROM comments WHERE id = ?',
            [id]
        );

        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found'
            });
        }

        // Update comment
        const result = await dbAsync.run(
            'UPDATE comments SET text = ? WHERE id = ?',
            [text, id]
        );

        if (result.changes === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Failed to update comment'
            });
        }

        res.json({
            status: 'success',
            message: 'Comment updated successfully'
        });
    } catch (error) {
        console.error('Update comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update comment'
        });
    }
});

// ============================================
// DELETE COMMENT (OWNER OR ADMIN ONLY)
// ============================================

router.delete('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await dbAsync.run(
            'DELETE FROM comments WHERE id = ?',
            [id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete comment'
        });
    }
});

module.exports = router;
