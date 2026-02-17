document.addEventListener('DOMContentLoaded', () => {
    // === 1. BUSCADOR EN TIEMPO REAL ===
    const searchInput = document.querySelector('.search-bar input');
    const bookCards = document.querySelectorAll('.book-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            bookCards.forEach(card => {
                const title = card.querySelector('.book-title').textContent.toLowerCase();
                const author = card.querySelector('.book-author').textContent.toLowerCase();
                
                card.style.display = (title.includes(searchTerm) || author.includes(searchTerm)) 
                    ? 'block' : 'none';
            });
        });
    }

    // === 2. FILTROS POR CATEGORÍA (Corregido para Ciencia vs Ciencia Ficción) ===
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
                // NUEVA LÓGICA: Si el filtro es "ciencia", ocultamos si el título contiene "ficción"
                else if (category === 'ciencia' && rowTitle.includes('ficción')) {
                    row.style.display = 'none';
                }
                // Si el filtro es "ciencia ficción", mostramos la fila correspondiente
                else if (rowTitle.includes(category)) {
                    row.style.display = 'block';
                } 
                else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // === 3. NOTIFICACIÓN AL AÑADIR AL CARRITO ===
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookTitle = button.closest('.book-card').querySelector('.book-title').textContent;
            
            const toast = document.createElement('div');
            toast.className = 'cart-toast';
            toast.innerHTML = `✅ <strong>${bookTitle}</strong> añadido al carrito`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        });
    });

    // === 4. CUENTA ATRÁS DINÁMICA ===
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