document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons and cards
    const buttons = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.tool-card');

    // Add click event to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the category from clicked button
            const category = this.dataset.category;
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show/hide cards based on category
            cards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'flex';
                } else {
                    const cardCategories = card.dataset.categories.split(',');
                    card.style.display = cardCategories.includes(category) ? 'flex' : 'none';
                }
            });
        });
    });
});
