/* ============================================
   NAVBAR FUNCTIONALITY
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Toggle sidebar
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close sidebar
    closeBtn.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Close sidebar on overlay click
    sidebarOverlay.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Toggle submenus
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other submenus
            categoryBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current submenu
            this.classList.toggle('active');
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('active');
            }
        });
    });

    // Close sidebar when clicking on a submenu item
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function() {
            setTimeout(() => {
                hamburgerBtn.classList.remove('active');
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }, 100);
        });
    });

    // Close sidebar on keyboard (Escape key)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});
