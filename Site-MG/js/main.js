// Script principal du site du Moulin Gouré

// Fonction pour gérer le menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu lorsqu'on clique sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Animation au scroll
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= window.innerHeight / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);

    // Initial call
    handleScrollAnimation();

    // Gestion des widgets flottants
    const closeButtons = document.querySelectorAll('.close-widget');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });

    // Animation au chargement de la page
    document.body.classList.add('page-load');

    // Gestion des formulaires
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici on pourrait envoyer le formulaire via AJAX
            alert('Merci pour votre message ! Nous vous répondrons bientôt.');
            this.reset();
        });
    }

    // Smooth scrolling pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialisation des animations
    initAnimations();
});

// Fonction pour initialiser les animations
function initAnimations() {
    // Ajouter des classes d'animation à certains éléments
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }

    // Animation de la barre de progression de la cagnotte
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
        // Simuler l'animation de chargement
        setTimeout(() => {
            const targetWidth = Math.floor(Math.random() * 30) + 60; // Entre 60% et 90%
            progressBar.style.width = targetWidth + '%';
        }, 1000);
    }
}

// Fonction pour gérer les images dans la galerie
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Ouvrir l'image en grand
            const imgSrc = this.querySelector('img').src;
            openImageModal(imgSrc);
        });
    });
}

// Fonction pour ouvrir le modal d'image
function openImageModal(src) {
    // Créer un modal simple (à améliorer)
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
    `;

    modal.appendChild(img);
    document.body.appendChild(modal);

    // Fermer le modal en cliquant sur l'image
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

// Fonction pour la synchronisation de la cagnotte avec Fondation Patrimoine
async function syncCrowdfundingData() {
    try {
        // Simuler une requête vers le serveur
        const response = await fetch('https://api.fondation-patrimoine.org/projects/moulin-goure');
        const data = await response.json();

        if (data) {
            document.getElementById('amount-raised').textContent = formatCurrency(data.amount_raised);
            document.getElementById('target-amount').textContent = formatCurrency(data.target_amount);

            // Mettre à jour la barre de progression
            const progress = (data.amount_raised / data.target_amount) * 100;
            document.querySelector('.progress').style.width = progress + '%';
        }
    } catch (error) {
        console.error('Erreur lors de la synchronisation:', error);
        // Utiliser les valeurs par défaut en cas d'erreur
        document.getElementById('amount-raised').textContent = '12 500 €';
        document.getElementById('target-amount').textContent = '20 000 €';
        document.querySelector('.progress').style.width = '62.5%';
    }
}

// Fonction pour formater les montants en euros
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}

// Gestion des langues (traduction)
const translations = {
    fr: {
        next_visit: "Prochaine visite",
        donate: "Faire un don",
        read_more: "Lire la suite",
        comments: "Commentaires",
        view_gallery: "Voir la galerie",
        visit_dates: "Dates de visite disponibles"
    },
    en: {
        next_visit: "Next visit",
        donate: "Make a donation",
        read_more: "Read more",
        comments: "Comments",
        view_gallery: "View gallery",
        visit_dates: "Available visit dates"
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Synchroniser les données de la cagnotte au chargement
    syncCrowdfundingData();

    // Initialiser les animations
    initAnimations();
});