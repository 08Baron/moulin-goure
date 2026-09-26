// Script d'animations pour le site du Moulin Gouré

// Fonction d'initialisation des animations
document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll
    initScrollAnimations();

    // Initialiser les widgets flottants
    initFloatingWidgets();

    // Initialiser les éléments interactifs
    initInteractiveElements();

    // Initialiser les formulaires
    initForms();
});

// Fonction pour initialiser les animations au scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-reveal, .fade-in, .slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Fonction pour initialiser les widgets flottants
function initFloatingWidgets() {
    const widgets = document.querySelectorAll('.widget');

    // Ajouter un effet hover aux widgets
    widgets.forEach(widget => {
        widget.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
        });

        widget.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        });
    });
}

// Fonction pour initialiser les éléments interactifs
function initInteractiveElements() {
    // Ajouter des effets aux boutons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    });

    // Ajouter des effets aux cartes
    const cards = document.querySelectorAll('.card, .article-card, .gallery-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Fonction pour initialiser les formulaires
function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ajouter une animation de soumission
            this.classList.add('submitting');

            // Simuler l'envoi du formulaire
            setTimeout(() => {
                this.classList.remove('submitting');
                this.classList.add('submitted');

                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    this.reset();
                    this.classList.remove('submitted');
                }, 3000);
            }, 1000);
        });
    });
}

// Fonction pour animer la cagnotte
function animateCrowdfunding() {
    const progressBar = document.querySelector('.progress');

    if (progressBar) {
        // Animation progressive de la barre de progression
        let progress = 0;
        const targetProgress = Math.floor(Math.random() * 30) + 60; // Entre 60% et 90%

        const interval = setInterval(() => {
            if (progress >= targetProgress) {
                clearInterval(interval);
            } else {
                progress += 1;
                progressBar.style.width = progress + '%';
            }
        }, 50);
    }
}

// Fonction pour gérer les filtres de galerie
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Ajouter une animation de révélation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Fonction pour gérer les transitions entre pages
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                // Navigation interne - pas de transition
                return;
            }

            e.preventDefault();

            // Animation de transition
            const body = document.body;
            body.classList.add('page-transition');

            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
}

// Fonction pour initialiser les éléments spécifiques au chargement
function initPageSpecificAnimations() {
    // Animation spécifique à la page d'accueil
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('animate');
        }, 500);
    }

    // Animation de la cagnotte au chargement
    animateCrowdfunding();
}

// Initialisation complète au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initPageSpecificAnimations();
    initGalleryFilters();
    initPageTransitions();
});