// Blog routes and controllers
const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const { dbAsync } = require('../models/database');
const auth = require('./auth');

// ============================================
// GET ALL BLOGS WITH PAGINATION & FILTERING
// ============================================

router.get('/', [
    query('category').optional().trim(),
    query('subcategory').optional().trim(),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('sort').optional().isIn(['newest', 'oldest', 'popular', 'trending'])
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

        const { category, subcategory, page = 1, limit = 9, sort = 'newest' } = req.query;

        // Build query
        let whereClause = '';
        let params = [];

        if (category) {
            whereClause += 'category = ?';
            params.push(category);
        }

        if (subcategory) {
            whereClause += (whereClause ? ' AND ' : '') + 'subcategory = ?';
            params.push(subcategory);
        }

        if (whereClause) {
            whereClause = 'WHERE ' + whereClause;
        }

        // Build sort clause
        let sortClause = 'ORDER BY created_at DESC';
        if (sort === 'oldest') {
            sortClause = 'ORDER BY created_at ASC';
        } else if (sort === 'popular') {
            sortClause = 'ORDER BY views DESC, likes DESC';
        } else if (sort === 'trending') {
            sortClause = 'ORDER BY likes DESC';
        }

        // Calculate offset
        const offset = (page - 1) * limit;

        // Get total count
        const countResult = await dbAsync.get(
            `SELECT COUNT(*) as total FROM blogs ${whereClause}`,
            params
        );
        const total = countResult.total;

        // Get blogs
        const blogs = await dbAsync.all(
            `SELECT * FROM blogs ${whereClause} ${sortClause} LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({
            status: 'success',
            data: blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch blogs'
        });
    }
});

// ============================================
// GET SINGLE BLOG
// ============================================

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await dbAsync.get(
            'SELECT * FROM blogs WHERE id = ?',
            [id]
        );

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Increment view count
        await dbAsync.run(
            'UPDATE blogs SET views = views + 1 WHERE id = ?',
            [id]
        );

        res.json({
            status: 'success',
            data: blog
        });
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch blog'
        });
    }
});

// ============================================
// CREATE BLOG (ADMIN ONLY)
// ============================================

router.post('/', auth.authenticateToken, [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('subcategory').trim().notEmpty().withMessage('Subcategory is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('read_time').optional().trim()
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

        const { title, category, subcategory, description, content, author, read_time } = req.body;

        const result = await dbAsync.run(
            'INSERT INTO blogs (title, category, subcategory, description, content, author, read_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, category, subcategory, description, content, author, read_time || '5 min']
        );

        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
            blog: {
                id: result.lastID,
                title,
                category,
                subcategory,
                author
            }
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create blog'
        });
    }
});

// ============================================
// UPDATE BLOG
// ============================================

router.put('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content, author } = req.body;

        const result = await dbAsync.run(
            'UPDATE blogs SET title = ?, description = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, description, content, author, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Blog updated successfully'
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update blog'
        });
    }
});

// ============================================
// DELETE BLOG
// ============================================

router.delete('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await dbAsync.run(
            'DELETE FROM blogs WHERE id = ?',
            [id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete blog'
        });
    }
});

// ============================================
// LIKE BLOG
// ============================================

router.post('/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        const ip_address = req.ip;

        // Check if already liked
        const existingLike = await dbAsync.get(
            'SELECT * FROM likes WHERE blog_id = ? AND (user_id = ? OR ip_address = ?)',
            [id, user_id || null, ip_address]
        );

        if (existingLike) {
            return res.status(400).json({
                status: 'error',
                message: 'Already liked this blog'
            });
        }

        // Add like
        await dbAsync.run(
            'INSERT INTO likes (blog_id, user_id, ip_address) VALUES (?, ?, ?)',
            [id, user_id || null, ip_address]
        );

        // Update blog likes count
        await dbAsync.run(
            'UPDATE blogs SET likes = likes + 1 WHERE id = ?',
            [id]
        );

        res.json({
            status: 'success',
            message: 'Blog liked successfully'
        });
    } catch (error) {
        console.error('Like blog error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to like blog'
        });
    }
});

module.exports = router;
