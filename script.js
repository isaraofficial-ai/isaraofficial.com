document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-lg');
            navbar.classList.add('bg-opacity-90');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    // --- Shop Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => {
                    b.classList.remove('bg-accent', 'text-primary');
                    b.classList.add('bg-secondary', 'text-gray-300');
                });
                // Add active class to clicked
                btn.classList.remove('bg-secondary', 'text-gray-300');
                btn.classList.add('bg-accent', 'text-primary');

                const filter = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Add a small fade-in animation
                        card.animate([
                            { opacity: 0, transform: 'scale(0.9)' },
                            { opacity: 1, transform: 'scale(1)' }
                        ], {
                            duration: 300,
                            easing: 'ease-out'
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Product Modal ---
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    // Modal Elements
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');

    if (modal) {
        function openModal(title, price) {
            if(modalTitle) modalTitle.textContent = title;
            if(modalPrice) modalPrice.textContent = price;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        function hideModal() {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }

        buyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Find parent card details
                const card = e.target.closest('.product-card');
                const title = card.querySelector('h3').textContent;
                const price = card.querySelector('.text-accent').textContent; // Price is in the accent color span
                openModal(title, price);
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', hideModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', hideModal);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                hideModal();
            }
        });
    }
});
