/* ============================================
   MAIN APPLICATION LOGIC
   ============================================ */

// Blog data is now loaded from mockdata.js
// Using storageManager to access and manage blog data
let sampleBlogs = [];

// Load and display latest blogs on homepage
document.addEventListener('DOMContentLoaded', function() {
    // Load blogs from storageManager
    if (typeof storageManager !== 'undefined') {
        sampleBlogs = storageManager.getAllBlogs();
    }

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
        window.location.href = `./pages/full-blog.html?id=${blog.id}`;
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
