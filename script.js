// Initialize scroll progress functionality
const initScrollProgress = () => {
    const progressBar = document.getElementById('scroll-progress');
    
    const calculateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        
        // Update progress bar width
        progressBar.style.width = `${progress}%`;
        
        // Add glow effect when scrolling
        progressBar.style.boxShadow = `0 0 ${10 + progress/10}px rgba(59,130,246,${0.3 + progress/200})`;
    };

    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    
    // Initial calculation
    calculateScrollProgress();
};

// Theme Toggle Functionality
const initThemeToggle = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const toolCards = document.querySelectorAll('.tool-card');
    const categoryNav = document.querySelector('.category-nav');
    const toolDetails = document.getElementById('toolDetails');
    const toolDetailsContent = toolDetails.querySelector('div');

    // Function to apply light theme
    const applyLightTheme = () => {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        
        // Update theme toggle icon
        themeToggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657L5.636 5.636m12.728 12.728L18.364 18.364M12 7a5 5 0 110 10 5 5 0 010-10z" />
            </svg>
        `;

        // Update tool cards and containers
        toolCards.forEach(card => {
            card.classList.add('bg-white/70', 'backdrop-blur-lg', 'border', 'border-slate-200', 'text-black');
            card.classList.remove('bg-slate-800/50', 'text-white');
        });

        categoryNav.classList.add('bg-white/70', 'backdrop-blur-lg', 'border', 'border-slate-200');
        categoryNav.classList.remove('bg-slate-800/50');

        // Update tool details modal
        if (toolDetailsContent) {
            toolDetailsContent.classList.add('bg-white', 'text-black', 'border', 'border-slate-300');
            toolDetailsContent.classList.remove('bg-slate-800', 'text-white', 'border-slate-700');
        }
    };

    // Function to apply dark theme
    const applyDarkTheme = () => {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        
        // Update theme toggle icon
        themeToggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        `;

        // Revert tool cards and containers to dark theme
        toolCards.forEach(card => {
            card.classList.remove('bg-white/70', 'backdrop-blur-lg', 'border', 'border-slate-200', 'text-black');
            card.classList.add('bg-slate-800/50', 'text-white');
        });

        categoryNav.classList.remove('bg-white/70', 'backdrop-blur-lg', 'border', 'border-slate-200');
        categoryNav.classList.add('bg-slate-800/50');

        // Revert tool details modal
        if (toolDetailsContent) {
            toolDetailsContent.classList.remove('bg-white', 'text-black', 'border', 'border-slate-300');
            toolDetailsContent.classList.add('bg-slate-800', 'text-white', 'border-slate-700');
        }
    };

    // Theme toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    });

    // Default to dark theme
    applyDarkTheme();
};

// Loading Skeleton Functions
const showSkeleton = () => {
    const skeleton = document.getElementById('loading-skeleton');
    if (skeleton) {
        skeleton.style.display = 'grid';
    }
};

const hideSkeleton = () => {
    const skeleton = document.getElementById('loading-skeleton');
    if (skeleton) {
        skeleton.style.display = 'none';
    }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollProgress();
    
    // Get all buttons and cards
    const buttons = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.tool-card');

    // Hide skeleton initially
    hideSkeleton();

    // Add click event to each button
    buttons.forEach(button => {
        button.addEventListener('click', async function() {
            // Show skeleton
            showSkeleton();
            
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Simulate loading time (remove in production)
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Get the category from clicked button
            const category = this.dataset.category;
            
            // Show/hide cards based on category
            cards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'flex';
                } else {
                    const cardCategories = card.dataset.categories.split(',');
                    card.style.display = cardCategories.includes(category) ? 'flex' : 'none';
                }
            });
            
            // Hide skeleton after filtering
            hideSkeleton();
        });
    });
});
