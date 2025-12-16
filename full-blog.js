/* ============================================
   FULL BLOG PAGE LOGIC
   ============================================ */

let currentBlog = null;
let comments = [];

document.addEventListener('DOMContentLoaded', function() {
    // Get blog ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (blogId) {
        loadBlog(blogId);
    } else {
        // Try to get from sessionStorage
        const storedBlog = sessionStorage.getItem('selectedBlog');
        if (storedBlog) {
            currentBlog = JSON.parse(storedBlog);
            displayBlog();
        } else {
            showBlogNotFound();
        }
    }

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Action buttons
    document.getElementById('shareBtn').addEventListener('click', shareBlog);
    document.getElementById('copyBtn').addEventListener('click', copyBlogLink);
    document.getElementById('printBtn').addEventListener('click', printBlog);
    document.getElementById('reportBtn').addEventListener('click', reportBlog);

    // Comment form
    document.getElementById('commentForm').addEventListener('submit', submitComment);

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Subscribed!';
            
            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
            }, 2000);
        });
    }
});

// Load blog by ID
function loadBlog(blogId) {
    currentBlog = getBlogById(blogId);
    
    if (currentBlog) {
        displayBlog();
    } else {
        showBlogNotFound();
    }
}

// Display blog content
function displayBlog() {
    if (!currentBlog) return;

    // Update page title
    document.title = currentBlog.title + ' - Inspresso';

    // Update blog header
    document.getElementById('fullBlogTitle').textContent = currentBlog.title;
    document.getElementById('fullBlogAuthor').textContent = currentBlog.author;
    document.getElementById('fullBlogDate').textContent = formatDate(currentBlog.date);
    document.getElementById('fullBlogReadTime').textContent = currentBlog.readTime + ' read';
    document.getElementById('fullBlogCategory').textContent = formatCategory(currentBlog.subcategory);

    // Update breadcrumb
    document.getElementById('categoryLink').href = `/pages/blog-listing.html?category=${currentBlog.category}&subcategory=${currentBlog.subcategory}`;
    document.getElementById('categoryLink').textContent = formatCategory(currentBlog.category);
    document.getElementById('blogTitle').textContent = currentBlog.title;

    // Update thumbnail
    document.getElementById('blogThumbnail').textContent = currentBlog.image;

    // Update blog content
    const contentDiv = document.getElementById('fullBlogContent');
    contentDiv.innerHTML = generateBlogContent(currentBlog);

    // Load comments
    loadComments();
}

// Generate blog content from data
function generateBlogContent(blog) {
    let content = `
        <h2>${blog.title}</h2>
        <p><strong>Category:</strong> ${formatCategory(blog.subcategory)}</p>
        <p>${blog.description}</p>
        
        <h3>Introduction</h3>
        <p>${blog.content}</p>
        
        <h3>Key Points</h3>
        <ul>
            <li>Understanding the fundamentals of ${blog.subcategory}</li>
            <li>Best practices and strategies</li>
            <li>Real-world applications</li>
            <li>Tips for improvement</li>
        </ul>
        
        <h2>Deep Dive</h2>
        <p>In this comprehensive guide, we explore the various aspects of ${formatCategory(blog.subcategory)}. Whether you're a beginner or an experienced practitioner, this article provides valuable insights and practical knowledge.</p>
        
        <h3>Chapter 1: Fundamentals</h3>
        <p>Understanding the basics is crucial. Let's start with the foundational concepts that will help you grasp the more complex ideas presented later in this article.</p>
        
        <h3>Chapter 2: Advanced Concepts</h3>
        <p>Once you've mastered the basics, we move on to more advanced topics. These concepts build upon the foundation and provide deeper insights into the subject matter.</p>
        
        <h3>Chapter 3: Practical Applications</h3>
        <p>Theory is important, but application is everything. In this section, we explore how these concepts are used in real-world scenarios.</p>
        
        <h2>Conclusion</h2>
        <p>In conclusion, ${formatCategory(blog.subcategory)} is an important and evolving field. By understanding the key concepts and staying updated with the latest developments, you can stay ahead of the curve and make informed decisions.</p>
        
        <h3>Further Resources</h3>
        <ul>
            <li>Online courses and tutorials</li>
            <li>Books and publications</li>
            <li>Community forums and discussions</li>
            <li>Workshops and seminars</li>
        </ul>
    `;

    return content;
}

// Load comments from localStorage
function loadComments() {
    const commentsKey = 'blog_' + (currentBlog ? currentBlog.id : 'unknown') + '_comments';
    const storedComments = localStorage.getItem(commentsKey);
    
    if (storedComments) {
        comments = JSON.parse(storedComments);
    } else {
        comments = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                text: 'Great article! Very informative and well-written. Thanks for sharing this knowledge.',
                date: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                text: 'I found this article very helpful. The examples were practical and easy to understand.',
                date: new Date().toISOString()
            }
        ];
    }

    displayComments();
}

// Display comments
function displayComments() {
    const commentsList = document.getElementById('commentsList');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="no-comments"><i class="fas fa-comments"></i><p>No comments yet. Be the first to comment!</p></div>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="comment-avatar">${comment.name.charAt(0).toUpperCase()}</div>
                    <div>
                        <div class="comment-name">${comment.name}</div>
                        <div class="comment-date">${formatDate(comment.date)}</div>
                    </div>
                </div>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>
    `).join('');
}

// Submit comment
function submitComment(e) {
    e.preventDefault();

    const name = document.getElementById('commentName').value;
    const email = document.getElementById('commentEmail').value;
    const text = document.getElementById('commentText').value;

    if (!name || !email || !text) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    const newComment = {
        id: comments.length + 1,
        name: name,
        email: email,
        text: text,
        date: new Date().toISOString()
    };

    comments.push(newComment);

    // Save to localStorage
    const commentsKey = 'blog_' + (currentBlog ? currentBlog.id : 'unknown') + '_comments';
    localStorage.setItem(commentsKey, JSON.stringify(comments));

    // Reset form
    document.getElementById('commentForm').reset();

    // Display updated comments
    displayComments();

    // Show success message
    showToast('Comment posted successfully!', 'success');

    // Scroll to comments
    setTimeout(() => {
        document.getElementById('commentsList').scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// Share blog
function shareBlog() {
    const url = window.location.href;
    const title = currentBlog.title;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: currentBlog.description,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!', 'success');
    }
}

// Copy blog link
function copyBlogLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('Blog link copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy link', 'error');
    });
}

// Print blog
function printBlog() {
    window.print();
}

// Report blog
function reportBlog() {
    const reason = prompt('Please tell us why you\'re reporting this blog:\n\nOptions:\n1. Inappropriate content\n2. Spam\n3. Misleading information\n4. Other');
    
    if (reason) {
        // In a real app, this would send to a server
        showToast('Thank you for your report. We\'ll review it shortly.', 'success');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Show blog not found
function showBlogNotFound() {
    const container = document.querySelector('.full-blog-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; background-color: white; border-radius: 12px; margin-top: 2rem;">
            <i class="fas fa-file-slash" style="font-size: 4rem; color: var(--coffee-light); margin-bottom: 1rem;"></i>
            <h2 style="color: var(--coffee-dark);">Blog Not Found</h2>
            <p style="color: var(--coffee-medium); margin-bottom: 2rem;">Sorry, we couldn't find the blog you're looking for.</p>
            <a href="./index.html" style="background-color: var(--coffee-accent); color: var(--text-light); padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Go to Home</a>
        </div>
    `;
}

// Export functions
window.loadBlog = loadBlog;
window.displayBlog = displayBlog;
window.submitComment = submitComment;
window.shareBlog = shareBlog;
window.copyBlogLink = copyBlogLink;

