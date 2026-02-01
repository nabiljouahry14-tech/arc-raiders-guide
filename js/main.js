// ===================================
//   ARC RAIDERS - INTERACTIVE JS
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Disclaimer modal: show before allowing interaction
    const DISCLAIMER_KEY = 'disclaimerAccepted';
    const disclaimerModal = document.getElementById('disclaimer-modal');
    const disclaimerAccept = document.getElementById('disclaimer-accept');
    const disclaimerLeave = document.getElementById('disclaimer-leave');

    const hideDisclaimer = () => {
        if (disclaimerModal) {
            disclaimerModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    const showDisclaimer = () => {
        if (disclaimerModal) {
            disclaimerModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // If not accepted previously, show the modal
    try {
        const accepted = localStorage.getItem(DISCLAIMER_KEY);
        if (!accepted) {
            showDisclaimer();
        }
    } catch (e) {
        showDisclaimer();
    }

    if (disclaimerAccept) {
        disclaimerAccept.addEventListener('click', () => {
            try { localStorage.setItem(DISCLAIMER_KEY, 'true'); } catch (e) {}
            hideDisclaimer();
        });
    }

    if (disclaimerLeave) {
        disclaimerLeave.addEventListener('click', () => {
            // Redirect user away from the site
            window.location.href = 'https://www.google.com';
        });
    }
    
    // ===================================
    // NAVIGATION
    // ===================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // STATS COUNTER ANIMATION
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }
    
    // ===================================
    // WEAPON FILTERS
    // ===================================
    const weaponFilters = document.querySelectorAll('.filter-btn[data-category]');
    const weaponCards = document.querySelectorAll('.weapon-card[data-category]');
    
    if (weaponFilters.length > 0) {
        weaponFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                weaponFilters.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter weapons with animation
                weaponCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===================================
    // RESOURCE TABS (Loot Page)
    // ===================================
    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourceContents = document.querySelectorAll('.resource-content');
    
    if (resourceTabs.length > 0) {
        resourceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                
                // Update active tab
                resourceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                resourceContents.forEach(content => {
                    if (content.getAttribute('data-content') === type) {
                        content.classList.add('active');
                        // Animate items
                        const items = content.querySelectorAll('.item-card');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 50);
                        });
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // ===================================
    // NEWS FILTERS
    // ===================================
    const newsFilters = document.querySelectorAll('.filter-bar .filter-btn');
    const newsArticles = document.querySelectorAll('.news-article-card');
    
    if (newsFilters.length > 0) {
        newsFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                
                // Update active button
                newsFilters.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter articles
                newsArticles.forEach(article => {
                    const category = article.getAttribute('data-category');
                    if (filterType === 'all' || category === filterType) {
                        article.style.display = 'block';
                        setTimeout(() => {
                            article.style.opacity = '1';
                            article.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        article.style.opacity = '0';
                        article.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            article.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===================================
    // NEWSLETTER FORM
    // ===================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message (you would normally send this to a server)
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            this.reset();
        });
    }
    
    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.weapon-card, .arc-card, .news-card, .about-card, .quick-card, .map-detail, .item-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // ===================================
    // STAT BAR ANIMATIONS
    // ===================================
    const animateStatBars = () => {
        const statBars = document.querySelectorAll('.bar-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statBars.forEach(bar => observer.observe(bar));
    };
    
    animateStatBars();
    
    // ===================================
    // PARALLAX EFFECT
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });
    
    // ===================================
    // TYPING EFFECT (Optional)
    // ===================================
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };
    
    // Apply typing effect to hero subtitle if exists
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && !sessionStorage.getItem('typingShown')) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 30);
        sessionStorage.setItem('typingShown', 'true');
    }
    
    // ===================================
    // MOUSE GLOW EFFECT
    // ===================================
    const createGlowEffect = () => {
        const cards = document.querySelectorAll('.weapon-card, .arc-card, .about-card, .quick-card, .loadout-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--mouse-x', `${x}px`);
                this.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };
    
    createGlowEffect();
    
    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    const createBackToTop = () => {
        // Create button
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
        `;
        
        document.body.appendChild(backToTop);
        
        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effect
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'translateY(0) scale(1)';
        });
    };
    
    createBackToTop();
    
    // ===================================
    // LOADING SCREEN (Optional)
    // ===================================
    const showLoadingScreen = () => {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--primary-color);"></i>
                <p style="margin-top: 1rem; color: var(--primary-color); font-size: 1.2rem;">Loading...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 500);
        });
    };
    
    // Uncomment to enable loading screen
    // showLoadingScreen();
    
    // ===================================
    // SEARCH FUNCTIONALITY (Optional Enhancement)
    // ===================================
    const implementSearch = () => {
        const searchBtn = document.querySelector('.search-btn');
        if (!searchBtn) return;
        
        searchBtn.addEventListener('click', function() {
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            searchOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 14, 26, 0.95);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            searchOverlay.innerHTML = `
                <div style="width: 90%; max-width: 600px;">
                    <input type="text" placeholder="Search..." style="
                        width: 100%;
                        padding: 1.5rem;
                        font-size: 1.5rem;
                        background: var(--card-bg);
                        border: 2px solid var(--primary-color);
                        border-radius: 10px;
                        color: white;
                    ">
                    <button class="close-search" style="
                        position: absolute;
                        top: 2rem;
                        right: 2rem;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 2rem;
                        cursor: pointer;
                    "><i class="fas fa-times"></i></button>
                </div>
            `;
            
            document.body.appendChild(searchOverlay);
            
            searchOverlay.querySelector('.close-search').addEventListener('click', () => {
                searchOverlay.remove();
            });
            
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    searchOverlay.remove();
                }
            });
        });
    };
    
    implementSearch();
    
    // ===================================
    // THEME TOGGLE (Optional)
    // ===================================
    const implementThemeToggle = () => {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;
        
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    };
    
    implementThemeToggle();
    
    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    console.log('%c🎮 ARC RAIDERS GUIDE 🎮', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome, Raider! May your extractions be successful.', 'color: #ff6b00; font-size: 14px;');
    console.log('%cWebsite developed with ❤️ for the ARC Raiders community', 'color: #b0b8cc; font-size: 12px;');
    
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// WEAPON TIER TABS
// ===================================

// Handle tier tab switching
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tier-tab')) {
        const tierNumber = e.target.dataset.tier;
        const weaponCard = e.target.closest('.weapon-card');
        
        // Remove active class from all tabs in this card
        weaponCard.querySelectorAll('.tier-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        e.target.classList.add('active');
        
        // Hide all tier contents in this card
        weaponCard.querySelectorAll('.tier-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tier content
        const selectedContent = weaponCard.querySelector(`.tier-content[data-tier="${tierNumber}"]`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
const preloadResources = () => {
    const criticalResources = [
        // Add paths to critical resources here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
    });
};

preloadResources();

// ===================================
// IMAGE MODAL/LIGHTBOX FOR MAPS
// ===================================
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const mapImages = document.querySelectorAll('.map-image img');
const modalClose = document.querySelector('.modal-close');

// Add click event to all map images
mapImages.forEach(img => {
    img.addEventListener('click', function() {
        imageModal.classList.add('active');
        modalImage.src = this.src;
        modalImage.alt = this.alt;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal when clicking the X
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside the image
if (imageModal) {
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

