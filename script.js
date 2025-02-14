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

// Loading Spinner Functions
const showSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'flex';
    }
};

const hideSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    
    // Get all buttons and cards
    const buttons = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.tool-card');

    // Hide spinner initially
    hideSpinner();

    // Add click event to each button
    buttons.forEach(button => {
        button.addEventListener('click', async function() {
            // Show spinner
            showSpinner();
            
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
            
            // Hide spinner after filtering
            hideSpinner();
        });
    });
});
