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
