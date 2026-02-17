document.addEventListener('DOMContentLoaded', () => {
 
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            const allCards = document.querySelectorAll('.book-card, .movie-card');

            allCards.forEach(card => {
                
                const title = card.querySelector('.book-title, .movie-title').textContent.toLowerCase();
                const info = card.querySelector('.book-author, .movie-author').textContent.toLowerCase();
                
                
                card.style.display = (title.includes(searchTerm) || info.includes(searchTerm)) 
                    ? 'block' : 'none';
            });
        });
    }

    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.textContent.toLowerCase().trim();
            const rows = document.querySelectorAll('.genre-row');

            rows.forEach(row => {
                const rowTitle = row.querySelector('.genre-title').textContent.toLowerCase();
                
                if (category === 'todos') {
                    row.style.display = 'block';
                } 
                
                else if (category === 'ciencia' && rowTitle.includes('ficción')) {
                    row.style.display = 'none';
                }
                
                else if (rowTitle.includes(category)) {
                    row.style.display = 'block';
                } 
                else {
                    row.style.display = 'none';
                }
            });
        });
    });

    
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {

            const card = button.closest('.book-card, .movie-card');
            const itemTitle = card.querySelector('.book-title, .movie-title').textContent;
            
            const toast = document.createElement('div');
            toast.className = 'cart-toast';
            toast.innerHTML = `✅ <strong>${itemTitle}</strong> añadido al carrito`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        });
    });

    
    const countdownElements = {
        days: document.querySelector('.countdown-item:nth-child(1) .countdown-number'),
        hours: document.querySelector('.countdown-item:nth-child(2) .countdown-number'),
        minutes: document.querySelector('.countdown-item:nth-child(3) .countdown-number'),
        seconds: document.querySelector('.countdown-item:nth-child(4) .countdown-number')
    };

    if (countdownElements.days) {
        let totalSeconds = 768 * 24 * 3600 + 1 * 3600 + 27 * 60 + 55;
        setInterval(() => {
            totalSeconds--;
            if(totalSeconds < 0) return;

            const d = Math.floor(totalSeconds / (24 * 3600));
            const h = Math.floor((totalSeconds % (24 * 3600)) / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            countdownElements.days.textContent = d;
            countdownElements.hours.textContent = h.toString().padStart(2, '0');
            countdownElements.minutes.textContent = m.toString().padStart(2, '0');
            countdownElements.seconds.textContent = s.toString().padStart(2, '0');
        }, 1000);
    }
});