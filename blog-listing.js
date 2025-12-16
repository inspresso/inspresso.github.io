/* ============================================
   BLOG LISTING PAGE LOGIC
   ============================================ */

const ITEMS_PER_PAGE = 9; // 3x3 grid
let currentPage = 1;
let currentCategory = '';
let currentSubcategory = '';
let filteredBlogs = [];

document.addEventListener('DOMContentLoaded', function() {
    // Get category and subcategory from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get('category') || '';
    currentSubcategory = urlParams.get('subcategory') || '';

    if (currentCategory && currentSubcategory) {
        loadBlogsByCategory();
    } else {
        showNoResults();
    }

    // Sort filter handler
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortBlogs(this.value);
            currentPage = 1;
            displayCurrentPage();
        });
    }

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

// Load blogs by category
function loadBlogsByCategory() {
    filteredBlogs = getBlogsByCategory(currentCategory, currentSubcategory);
    
    if (filteredBlogs.length === 0) {
        showNoResults();
        return;
    }

    // Update page title and breadcrumb
    updatePageHeader();
    
    // Display first page
    displayCurrentPage();
}

// Update page header and breadcrumb
function updatePageHeader() {
    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    const breadcrumbSubcategory = document.getElementById('breadcrumbSubcategory');

    const categoryName = formatCategory(currentCategory);
    const subcategoryName = formatCategory(currentSubcategory);

    pageTitle.textContent = `${categoryName} - ${subcategoryName}`;
    pageDescription.textContent = `Explore ${filteredBlogs.length} articles in ${subcategoryName}`;
    breadcrumbCategory.textContent = categoryName;
    breadcrumbSubcategory.textContent = subcategoryName;
}

// Display current page of blogs
function displayCurrentPage() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageBlogs = filteredBlogs.slice(startIndex, endIndex);

    const blogGrid = document.getElementById('blogGrid');
    displayBlogs(pageBlogs, blogGrid);

    // Update pagination
    updatePagination();
}

// Update pagination controls
function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(prevBtn);

    // Page numbers
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
        const firstPage = document.createElement('button');
        firstPage.className = 'pagination-page';
        firstPage.textContent = '1';
        firstPage.addEventListener('click', function() {
            currentPage = 1;
            displayCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(firstPage);

        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.style.padding = '10px 5px';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-page' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', function() {
            currentPage = i;
            displayCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.style.padding = '10px 5px';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }

        const lastPage = document.createElement('button');
        lastPage.className = 'pagination-page';
        lastPage.textContent = totalPages;
        lastPage.addEventListener('click', function() {
            currentPage = totalPages;
            displayCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(lastPage);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(nextBtn);
}

// Sort blogs
function sortBlogs(sortType) {
    const blogsToSort = [...filteredBlogs];

    switch(sortType) {
        case 'oldest':
            blogsToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            // For demo, sort by reverse date (newer = more popular)
            blogsToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'reading-time':
            blogsToSort.sort((a, b) => {
                const timeA = parseInt(a.readTime);
                const timeB = parseInt(b.readTime);
                return timeA - timeB;
            });
            break;
        case 'newest':
        default:
            blogsToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    filteredBlogs = blogsToSort;
}

// Show no results message
function showNoResults() {
    const blogGrid = document.getElementById('blogGrid');
    const pagination = document.getElementById('pagination');

    blogGrid.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <h3>No blogs found</h3>
            <p>Sorry, we couldn't find any blogs in this category. Please try another category or check back later!</p>
        </div>
    `;

    pagination.innerHTML = '';

    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');
    pageTitle.textContent = 'No Results';
    pageDescription.textContent = 'Category not found';
}

// Export functions
window.loadBlogsByCategory = loadBlogsByCategory;
window.displayCurrentPage = displayCurrentPage;
window.sortBlogs = sortBlogs;
