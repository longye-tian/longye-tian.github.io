/**
 * Main JavaScript - Common functionality across all pages
 */

/**
 * Theme management
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle button icon on load
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button icon if it exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

/**
 * Initialize fade-in animations using Intersection Observer
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Add smooth scroll behavior to anchor links
 */
function initSmoothScroll() {
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
}

/**
 * Create typing animation effect
 * @param {HTMLElement} element - Element to apply typing effect
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds
 */
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Create filter/tab functionality
 * @param {string} filterSelector - Selector for filter buttons
 * @param {string} itemSelector - Selector for filterable items
 * @param {string} activeClass - Class name for active state
 */
function initFilters(filterSelector, itemSelector, activeClass = 'active') {
    const filters = document.querySelectorAll(filterSelector);
    const items = document.querySelectorAll(itemSelector);
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove(activeClass));
            filter.classList.add(activeClass);
            
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter items
            items.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Toggle element visibility
 * @param {string} toggleSelector - Selector for toggle buttons
 * @param {string} targetAttribute - Attribute containing target selector
 */
function initToggles(toggleSelector, targetAttribute = 'data-target') {
    document.querySelectorAll(toggleSelector).forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetSelector = toggle.getAttribute(targetAttribute);
            const target = document.querySelector(targetSelector);
            
            if (target) {
                if (target.style.display === 'none' || !target.style.display) {
                    target.style.display = 'block';
                    toggle.textContent = toggle.textContent.replace('Show', 'Hide');
                } else {
                    target.style.display = 'none';
                    toggle.textContent = toggle.textContent.replace('Hide', 'Show');
                }
            }
        });
    });
}

/**
 * Add hover effects to cards/panels
 * @param {string} selector - Selector for hoverable elements
 */
function initHoverEffects(selector = '.card, .panel') {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Format dates to relative time
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @param {HTMLElement} feedbackElement - Optional element to show feedback
 */
async function copyToClipboard(text, feedbackElement = null) {
    try {
        await navigator.clipboard.writeText(text);
        if (feedbackElement) {
            const originalText = feedbackElement.textContent;
            feedbackElement.textContent = 'Copied!';
            setTimeout(() => {
                feedbackElement.textContent = originalText;
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Initialize all common functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAnimations();
    initSmoothScroll();
    initHoverEffects();
    
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
});

// Export functions for use in other scripts
window.CommonUtils = {
    typeText,
    initFilters,
    initToggles,
    formatRelativeTime,
    copyToClipboard,
    debounce,
    toggleTheme
};