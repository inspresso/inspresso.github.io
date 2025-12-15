/* ============================================
   MAIN APPLICATION LOGIC
   ============================================ */

// Sample blog data (will be replaced with API calls)
const sampleBlogs = [
    {
        id: 1,
        title: "Understanding Primary Education Methods",
        category: "education",
        subcategory: "primary",
        description: "Explore effective teaching strategies for primary school students and how to engage young learners...",
        content: "Full content of the blog about primary education...",
        author: "Sarah Johnson",
        date: "2025-01-15",
        readTime: "5 min",
        image: "📚"
    },
    {
        id: 2,
        title: "Secondary School Curriculum Guide",
        category: "education",
        subcategory: "secondary",
        description: "Comprehensive guide to secondary education curriculum and academic excellence strategies...",
        content: "Full content about secondary education...",
        author: "Prof. Michael Brown",
        date: "2025-01-14",
        readTime: "8 min",
        image: "🎓"
    },
    {
        id: 3,
        title: "The Art of Music Production",
        category: "entertainment",
        subcategory: "musical",
        description: "Learn the fundamentals of music production and create your own beats...",
        content: "Full content about music production...",
        author: "Alex Rivera",
        date: "2025-01-13",
        readTime: "6 min",
        image: "🎵"
    },
    {
        id: 4,
        title: "Theatre Performance Techniques",
        category: "entertainment",
        subcategory: "theatre",
        description: "Master the art of theatrical performance and stage presence...",
        content: "Full content about theatre...",
        author: "Emma Watson",
        date: "2025-01-12",
        readTime: "7 min",
        image: "🎭"
    },
    {
        id: 5,
        title: "Contemporary Dance Moves",
        category: "entertainment",
        subcategory: "dancing",
        description: "Discover modern dance techniques and choreography tips...",
        content: "Full content about dancing...",
        author: "Lisa Chen",
        date: "2025-01-11",
        readTime: "5 min",
        image: "💃"
    },
    {
        id: 6,
        title: "Digital Art Masterclass",
        category: "entertainment",
        subcategory: "art",
        description: "Create stunning digital artwork with modern tools and techniques...",
        content: "Full content about digital art...",
        author: "David Kim",
        date: "2025-01-10",
        readTime: "9 min",
        image: "🎨"
    },
    {
        id: 7,
        title: "Beauty Skincare Routine",
        category: "lifestyle",
        subcategory: "beauty",
        description: "Complete guide to achieving glowing skin with proper skincare...",
        content: "Full content about skincare...",
        author: "Jessica Taylor",
        date: "2025-01-09",
        readTime: "6 min",
        image: "✨"
    },
    {
        id: 8,
        title: "Mental Health and Meditation",
        category: "lifestyle",
        subcategory: "mental-health",
        description: "Improve your mental wellbeing through meditation and mindfulness...",
        content: "Full content about mental health...",
        author: "Dr. Robert Hayes",
        date: "2025-01-08",
        readTime: "7 min",
        image: "🧘"
    },
    {
        id: 9,
        title: "Fitness and Health Guide",
        category: "lifestyle",
        subcategory: "health",
        description: "Complete fitness guide for a healthier lifestyle...",
        content: "Full content about health...",
        author: "Coach Maria",
        date: "2025-01-07",
        readTime: "8 min",
        image: "💪"
    },
    {
        id: 10,
        title: "Improve Your Brain Performance",
        category: "lifestyle",
        subcategory: "brain-improvements",
        description: "Science-backed techniques to enhance cognitive function...",
        content: "Full content about brain improvements...",
        author: "Dr. James Wilson",
        date: "2025-01-06",
        readTime: "7 min",
        image: "🧠"
    },
    {
        id: 11,
        title: "Chemistry Fundamentals",
        category: "scientific",
        subcategory: "chemistry",
        description: "Understanding the basics of chemistry and chemical reactions...",
        content: "Full content about chemistry...",
        author: "Dr. Anna Schmidt",
        date: "2025-01-05",
        readTime: "8 min",
        image: "⚗️"
    },
    {
        id: 12,
        title: "Physics Laws Explained",
        category: "scientific",
        subcategory: "physics",
        description: "Demystify the laws of physics with practical examples...",
        content: "Full content about physics...",
        author: "Prof. Newton",
        date: "2025-01-04",
        readTime: "9 min",
        image: "⚛️"
    },
    {
        id: 13,
        title: "Biology and Life Sciences",
        category: "scientific",
        subcategory: "biology",
        description: "Explore the fascinating world of biology and life...",
        content: "Full content about biology...",
        author: "Dr. Charles Darwin",
        date: "2025-01-03",
        readTime: "8 min",
        image: "🦠"
    },
    {
        id: 14,
        title: "Mathematics Made Easy",
        category: "scientific",
        subcategory: "mathematics",
        description: "Master mathematics concepts with simple explanations...",
        content: "Full content about mathematics...",
        author: "Prof. Pythagoras",
        date: "2025-01-02",
        readTime: "7 min",
        image: "🔢"
    }
];

// Load and display latest blogs on homepage
document.addEventListener('DOMContentLoaded', function() {
    const latestBlogsGrid = document.getElementById('latestBlogsGrid');
    
    if (latestBlogsGrid) {
        // Display first 6 blogs on homepage
        const latestBlogs = sampleBlogs.slice(0, 6);
        displayBlogs(latestBlogs, latestBlogsGrid);
    }

    // Newsletter form handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Subscribed!';
            button.style.backgroundColor = 'var(--coffee-accent)';
            
            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        });
    }
});

// Display blog cards
function displayBlogs(blogs, container) {
    container.innerHTML = '';
    
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        container.appendChild(blogCard);
    });
}

// Create blog card element
function createBlogCard(blog) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    card.innerHTML = `
        <div class="blog-card-image">
            <i class="fas fa-image">${blog.image}</i>
        </div>
        <div class="blog-card-content">
            <span class="blog-card-category">${formatCategory(blog.subcategory)}</span>
            <h3 class="blog-card-title">${blog.title}</h3>
            <p class="blog-card-description">${blog.description}</p>
            <div class="blog-card-meta">
                <div class="blog-card-author">
                    <i class="fas fa-user"></i>
                    <span>${blog.author}</span>
                </div>
                <div class="blog-card-date">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(blog.date)}</span>
                </div>
                <div class="blog-card-read-time">
                    <i class="fas fa-clock"></i>
                    <span>${blog.readTime}</span>
                </div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function() {
        // Store blog data in sessionStorage
        sessionStorage.setItem('selectedBlog', JSON.stringify(blog));
        window.location.href = `/pages/full-blog.html?id=${blog.id}`;
    });
    
    return card;
}

// Format category name
function formatCategory(subcategory) {
    return subcategory
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get all blogs for a category/subcategory
function getBlogsByCategory(category, subcategory) {
    return sampleBlogs.filter(blog => 
        blog.category === category && blog.subcategory === subcategory
    );
}

// Get blog by ID
function getBlogById(id) {
    return sampleBlogs.find(blog => blog.id === parseInt(id));
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions for use in other files
window.displayBlogs = displayBlogs;
window.getBlogsByCategory = getBlogsByCategory;
window.getBlogById = getBlogById;
window.scrollToTop = scrollToTop;
window.formatDate = formatDate;
window.formatCategory = formatCategory;
