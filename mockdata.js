/* ============================================
   MOCK DATA - Sample blogs, users, and comments
   ============================================ */

const mockData = {
    // Sample blogs data
    blogs: [
        {
            id: 1,
            title: "Understanding Primary Education Methods",
            category: "education",
            subcategory: "primary",
            description: "Explore effective teaching strategies for primary school students and how to engage young learners with interactive methods.",
            content: "Primary education forms the foundation of a child's learning journey. Effective teaching strategies focus on interactive learning, hands-on activities, and building strong fundamentals.",
            author: "Sarah Johnson",
            date: "2025-01-15",
            readTime: "5 min",
            image: "📚",
            views: 234,
            likes: 45
        },
        {
            id: 2,
            title: "Secondary School Curriculum Guide",
            category: "education",
            subcategory: "secondary",
            description: "Comprehensive guide to secondary education curriculum and academic excellence strategies for students.",
            content: "Secondary education is a crucial phase where students specialize in various subjects. This guide covers best practices in curriculum design and student engagement.",
            author: "Prof. Michael Brown",
            date: "2025-01-14",
            readTime: "8 min",
            image: "🎓",
            views: 156,
            likes: 32
        },
        {
            id: 3,
            title: "The Art of Music Production",
            category: "entertainment",
            subcategory: "musical",
            description: "Learn the fundamentals of music production and create your own beats with modern tools and techniques.",
            content: "Music production has become more accessible than ever. From choosing the right tools to mastering your first track, this guide covers everything you need to know.",
            author: "Alex Rivera",
            date: "2025-01-13",
            readTime: "6 min",
            image: "🎵",
            views: 289,
            likes: 67
        },
        {
            id: 4,
            title: "Theatre Performance Techniques",
            category: "entertainment",
            subcategory: "theatre",
            description: "Master the art of theatrical performance and stage presence with proven techniques.",
            content: "Theatre is a powerful medium for storytelling. Learn how to develop character depth, project emotion, and command the stage.",
            author: "Emma Watson",
            date: "2025-01-12",
            readTime: "7 min",
            image: "🎭",
            views: 198,
            likes: 54
        },
        {
            id: 5,
            title: "Contemporary Dance Moves",
            category: "entertainment",
            subcategory: "dancing",
            description: "Discover modern dance techniques and choreography tips to enhance your dance skills.",
            content: "Contemporary dance blends technical precision with artistic expression. This guide breaks down fundamental movements and choreography principles.",
            author: "Lisa Chen",
            date: "2025-01-11",
            readTime: "5 min",
            image: "💃",
            views: 312,
            likes: 78
        },
        {
            id: 6,
            title: "Digital Art Masterclass",
            category: "entertainment",
            subcategory: "art",
            description: "Create stunning digital artwork with modern tools and techniques for beginners and advanced artists.",
            content: "Digital art opens unlimited creative possibilities. Learn about color theory, composition, and digital painting techniques.",
            author: "David Kim",
            date: "2025-01-10",
            readTime: "9 min",
            image: "🎨",
            views: 267,
            likes: 89
        },
        {
            id: 7,
            title: "Beauty Skincare Routine",
            category: "lifestyle",
            subcategory: "beauty",
            description: "Complete guide to achieving glowing skin with proper skincare habits and product recommendations.",
            content: "Your skin is your largest organ. Establish a consistent routine with cleansing, toning, and moisturizing for optimal skin health.",
            author: "Jessica Taylor",
            date: "2025-01-09",
            readTime: "6 min",
            image: "✨",
            views: 445,
            likes: 123
        },
        {
            id: 8,
            title: "Mental Health and Meditation",
            category: "lifestyle",
            subcategory: "mental-health",
            description: "Improve your mental wellbeing through meditation and mindfulness practices.",
            content: "Mental health is as important as physical health. Meditation and mindfulness can significantly improve your emotional wellbeing.",
            author: "Dr. Robert Hayes",
            date: "2025-01-08",
            readTime: "7 min",
            image: "🧘",
            views: 378,
            likes: 95
        },
        {
            id: 9,
            title: "Fitness and Health Guide",
            category: "lifestyle",
            subcategory: "health",
            description: "Complete fitness guide for building a healthier lifestyle through exercise and nutrition.",
            content: "Health is wealth. A balanced approach to fitness includes regular exercise, proper nutrition, and adequate rest.",
            author: "Coach Maria",
            date: "2025-01-07",
            readTime: "8 min",
            image: "💪",
            views: 512,
            likes: 142
        },
        {
            id: 10,
            title: "Improve Your Brain Performance",
            category: "lifestyle",
            subcategory: "brain-improvements",
            description: "Science-backed techniques to enhance cognitive function and mental performance.",
            content: "Your brain is like a muscle - it needs exercise. Learn techniques to improve memory, focus, and mental clarity.",
            author: "Dr. James Wilson",
            date: "2025-01-06",
            readTime: "7 min",
            image: "🧠",
            views: 334,
            likes: 76
        },
        {
            id: 11,
            title: "Chemistry Fundamentals",
            category: "scientific",
            subcategory: "chemistry",
            description: "Understanding the basics of chemistry and chemical reactions in everyday life.",
            content: "Chemistry is the science of matter. From atomic structures to chemical reactions, discover the fascinating world of chemistry.",
            author: "Dr. Anna Schmidt",
            date: "2025-01-05",
            readTime: "8 min",
            image: "⚗️",
            views: 201,
            likes: 48
        },
        {
            id: 12,
            title: "Physics Laws Explained",
            category: "scientific",
            subcategory: "physics",
            description: "Demystify the laws of physics with practical examples and demonstrations.",
            content: "Physics governs everything in our universe. Understanding these laws helps us comprehend natural phenomena.",
            author: "Prof. Newton",
            date: "2025-01-04",
            readTime: "9 min",
            image: "⚛️",
            views: 289,
            likes: 64
        },
        {
            id: 13,
            title: "Biology and Life Sciences",
            category: "scientific",
            subcategory: "biology",
            description: "Explore the fascinating world of biology and life sciences.",
            content: "Biology is the study of life in all its forms. From cells to ecosystems, biology reveals the complexity and beauty of living organisms.",
            author: "Dr. Charles Darwin",
            date: "2025-01-03",
            readTime: "8 min",
            image: "🦠",
            views: 267,
            likes: 71
        },
        {
            id: 14,
            title: "Mathematics Made Easy",
            category: "scientific",
            subcategory: "mathematics",
            description: "Master mathematics concepts with simple explanations and real-world applications.",
            content: "Mathematics is the language of the universe. From basic arithmetic to advanced calculus, math is essential for understanding the world.",
            author: "Prof. Pythagoras",
            date: "2025-01-02",
            readTime: "7 min",
            image: "🔢",
            views: 356,
            likes: 82
        }
    ],

    // Sample comments (will be expanded by user submissions)
    comments: {
        1: [
            {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                text: "Great article! Very informative and well-written. Thanks for sharing this knowledge.",
                date: new Date().toISOString()
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                text: "I found this article very helpful. The examples were practical and easy to understand.",
                date: new Date().toISOString()
            }
        ]
    },

    // Sample registered users
    users: [
        {
            id: 1,
            name: "Demo User",
            email: "demo@inspresso.com",
            password: "demo123", // Simple password for demo
            category: "education",
            createdAt: new Date().toISOString()
        }
    ]
};

// ============================================
// STORAGE HELPER FUNCTIONS
// ============================================

const storageManager = {
    // Get all blogs
    getAllBlogs: function() {
        const stored = localStorage.getItem('inspresso_blogs');
        return stored ? JSON.parse(stored) : mockData.blogs;
    },

    // Get blogs by category and subcategory
    getBlogsByCategory: function(category, subcategory) {
        const blogs = this.getAllBlogs();
        return blogs.filter(blog => 
            blog.category === category && blog.subcategory === subcategory
        );
    },

    // Get single blog
    getBlogById: function(id) {
        const blogs = this.getAllBlogs();
        return blogs.find(blog => blog.id === parseInt(id));
    },

    // Save new blog
    saveBlog: function(blog) {
        const blogs = this.getAllBlogs();
        blog.id = Math.max(...blogs.map(b => b.id), 0) + 1;
        blogs.push(blog);
        localStorage.setItem('inspresso_blogs', JSON.stringify(blogs));
        return blog;
    },

    // Update blog
    updateBlog: function(id, updates) {
        const blogs = this.getAllBlogs();
        const index = blogs.findIndex(b => b.id === parseInt(id));
        if (index !== -1) {
            blogs[index] = { ...blogs[index], ...updates };
            localStorage.setItem('inspresso_blogs', JSON.stringify(blogs));
            return blogs[index];
        }
        return null;
    },

    // Get comments for a blog
    getComments: function(blogId) {
        const stored = localStorage.getItem('inspresso_comments_' + blogId);
        if (stored) {
            return JSON.parse(stored);
        }
        return mockData.comments[blogId] || [];
    },

    // Save comment
    saveComment: function(blogId, comment) {
        const comments = this.getComments(blogId);
        comment.id = comments.length > 0 ? Math.max(...comments.map(c => c.id), 0) + 1 : 1;
        comment.date = new Date().toISOString();
        comments.push(comment);
        localStorage.setItem('inspresso_comments_' + blogId, JSON.stringify(comments));
        return comment;
    },

    // Get all users
    getAllUsers: function() {
        const stored = localStorage.getItem('inspresso_users');
        return stored ? JSON.parse(stored) : mockData.users;
    },

    // Register new user
    registerUser: function(user) {
        const users = this.getAllUsers();
        
        // Check if email exists
        if (users.some(u => u.email === user.email)) {
            return { success: false, message: 'Email already registered' };
        }

        user.id = Math.max(...users.map(u => u.id), 0) + 1;
        user.createdAt = new Date().toISOString();
        users.push(user);
        localStorage.setItem('inspresso_users', JSON.stringify(users));
        return { success: true, user: user };
    },

    // Find user by email and password
    loginUser: function(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);
        return user || null;
    },

    // Get current user
    getCurrentUser: function() {
        const stored = localStorage.getItem('inspresso_currentUser');
        return stored ? JSON.parse(stored) : null;
    },

    // Set current user
    setCurrentUser: function(user) {
        if (user) {
            localStorage.setItem('inspresso_currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('inspresso_currentUser');
        }
    },

    // Like a blog
    likeBlog: function(blogId, userId) {
        const blogs = this.getAllBlogs();
        const blog = blogs.find(b => b.id === parseInt(blogId));
        
        if (blog) {
            // Track likes
            const likedBlogs = JSON.parse(localStorage.getItem('inspresso_liked_blogs') || '[]');
            const likeKey = blogId + '_' + (userId || 'guest');
            
            if (!likedBlogs.includes(likeKey)) {
                likedBlogs.push(likeKey);
                blog.likes = (blog.likes || 0) + 1;
                localStorage.setItem('inspresso_blogs', JSON.stringify(blogs));
                localStorage.setItem('inspresso_liked_blogs', JSON.stringify(likedBlogs));
                return true;
            }
            return false;
        }
        return false;
    },

    // Check if blog is liked
    isLiked: function(blogId, userId) {
        const likedBlogs = JSON.parse(localStorage.getItem('inspresso_liked_blogs') || '[]');
        const likeKey = blogId + '_' + (userId || 'guest');
        return likedBlogs.includes(likeKey);
    }
};

// Initialize mock data on first load
if (!localStorage.getItem('inspresso_blogs')) {
    localStorage.setItem('inspresso_blogs', JSON.stringify(mockData.blogs));
}

// Export for use in other files
window.storageManager = storageManager;
window.mockData = mockData;
