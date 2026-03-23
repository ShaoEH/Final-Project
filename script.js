const artworks = [
    { id: 1, type: 'oil', title: 'Serenity', medium: 'Oil on Canvas', img: 'images/Serenity.png', desc: 'A study of classical floral arrangements contrasted with modern dark shadows.' },
    { id: 2, type: 'oil', title: 'Golden Fields', medium: 'Oil on Canvas', img: 'images/Golden_Fields.png', desc: 'Capturing the radiant light of a meadow during the golden hour.' },
    { id: 3, type: 'oil', title: 'Midnight Bloom', medium: 'Oil on Canvas', img: 'images/Midnight_Bloom.png', desc: 'Mysterious blossoms emerging from the depths of a starlit night.' },
    { id: 4, type: 'digital', title: 'Cyber Pulse', medium: 'Digital Art', img: 'images/Cyber_Pulse.png', desc: 'Visualizing the rhythmic energy found within digital currents.' },
    { id: 5, type: 'digital', title: 'Neon Dreams', medium: 'Digital Art', img: 'images/Neon_Dreams.png', desc: 'An intersection of vibrant hues and overlapping virtual planes.' },
    { id: 6, type: 'digital', title: 'Pixel Horizon', medium: 'Digital Art', img: 'images/Pixel_Horizon.png', desc: 'A futuristic horizon rendered through a stylized pixelated lens.' },
    { id: 7, type: 'watercolor', title: 'Azure Mist', medium: 'Watercolor', img: 'images/Azure_Mist.png', desc: 'Depicting a tranquil lake enveloped in early morning fog.' },
    { id: 8, type: 'watercolor', title: 'Spring Petals', medium: 'Watercolor', img: 'images/Spring_Petals.png', desc: 'Capturing the delicate transparency of cherry blossoms in spring.' },
    { id: 9, type: 'watercolor', title: 'Rainy Street', medium: 'Watercolor', img: 'images/Rainy_Street.png', desc: 'Reflections and soft light on a city street after a rain shower.' }
];

const appLogic = {
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    filterArtworks: function(data, filterType, searchKeyword) {
        return data.filter(art => {
            const matchType = filterType === 'all' || art.type === filterType;
            const matchSearch = art.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
                                art.medium.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchType && matchSearch;
        });
    }
};

let currentFilter = 'all';
let currentSearch = '';

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    const filtered = appLogic.filterArtworks(artworks, currentFilter, currentSearch);

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No artworks found matching your criteria.</p>';
        return;
    }

    filtered.forEach(art => {
        const card = document.createElement('figure');
        card.className = 'art-card';
        card.setAttribute('tabindex', '0');
        
        const openCard = () => openModal(art.img, art.title, art.medium, art.desc);
        card.onclick = openCard;
        card.onkeydown = (e) => { if (e.key === 'Enter') openCard(); };

        const img = document.createElement('img');
        img.alt = art.title;
        img.loading = "lazy";
        img.src = art.img;
        img.srcset = `${art.img} 1000w, ${art.img.replace('.png', '_small.png')} 500w`;
        img.sizes = "(max-width: 600px) 100vw, 33vw";

        card.innerHTML = `
            <figcaption>
                <h3>${art.title}</h3>
                <p>${art.medium}</p>
            </figcaption>
        `;
        card.prepend(img);
        grid.appendChild(card);
    });
}

function openModal(imgSrc, title, medium, desc) {
    const modal = document.getElementById("artModal");
    if (!modal) return;

    document.getElementById("modalImg").src = imgSrc;
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalMedium").innerText = medium;
    document.getElementById("modalDesc").innerText = desc;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    
    const closeBtn = document.querySelector('.close-btn');
    if(closeBtn) closeBtn.focus();
}

function closeModal() {
    const modal = document.getElementById("artModal");
    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    if (grid) renderGallery();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderGallery();
        });
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const handleSearch = debounce((e) => {
            currentSearch = e.target.value;
            renderGallery();
        }, 300);
        searchInput.addEventListener('input', handleSearch);
    }

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            const isExpanded = parent.classList.contains('active');
            parent.classList.toggle('active');
            question.setAttribute('aria-expanded', !isExpanded);
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            
            document.querySelectorAll('.error-msg').forEach(el => el.remove());
            emailInput.classList.remove('input-error');

            if (!appLogic.validateEmail(emailInput.value)) {
                emailInput.classList.add('input-error');
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-msg';
                errorMsg.style.color = 'red';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.innerText = 'Please enter a valid email address.';
                emailInput.parentElement.appendChild(errorMsg);
                return;
            }

            const userName = document.getElementById('name').value.trim().split(' ')[0];
            const formCard = contactForm.parentElement;

            formCard.style.opacity = '0';
            setTimeout(() => {
                formCard.innerHTML = `
                    <div class="success-message" aria-live="polite" style="text-align: center; padding: 2rem;">
                        <div class="success-icon" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;">✓</div>
                        <h3>Message Sent</h3>
                        <p style="margin: 1rem 0;">Hello ${userName}, thank you for reaching out! I've received your inquiry.</p>
                        <button onclick="location.reload()" class="btn active">Send another message</button>
                    </div>
                `;
                formCard.style.opacity = '1';
                formCard.style.transition = 'opacity 0.5s ease';
            }, 500);
        });
    }
});

window.onclick = (event) => {
    if (event.target == document.getElementById("artModal")) closeModal();
};

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});