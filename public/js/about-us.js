// About Us page functionality
document.addEventListener('DOMContentLoaded', function() {
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
