// Research Page JavaScript

// Abstract toggle functionality
function initializeAbstractToggles() {
    document.querySelectorAll('.abstract-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('span');
            
            content.classList.toggle('show');
            arrow.textContent = content.classList.contains('show') ? '▼' : '▶';
            this.innerHTML = `<span>${arrow.textContent}</span> ${content.classList.contains('show') ? 'Hide' : 'Show'} Abstract`;
        });
    });
}

// Math preview toggle
function initializeMathPreviewToggles() {
    document.querySelectorAll('.show-math-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const mathPreview = this.closest('.paper-entry').querySelector('.math-preview');
            if (mathPreview) {
                mathPreview.classList.toggle('show');
                this.innerHTML = mathPreview.classList.contains('show') 
                    ? '<span>∑</span> Hide Equations' 
                    : '<span>∑</span> Key Equations';
            }
        });
    });
}

// Filter functionality
function initializeFilterTabs() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter papers
            const filter = this.getAttribute('data-filter');
            const papers = document.querySelectorAll('.paper-entry');
            
            papers.forEach(paper => {
                if (filter === 'all') {
                    paper.style.display = 'block';
                } else {
                    paper.style.display = paper.getAttribute('data-status') === filter ? 'block' : 'none';
                }
            });
            
            // Update URL hash
            window.location.hash = filter;
        });
    });
    
    // Check URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash && document.querySelector(`.filter-tab[data-filter="${hash}"]`)) {
        document.querySelector(`.filter-tab[data-filter="${hash}"]`).click();
    }
}

// BibTeX generation
function generateBibTeX(paperData) {
    const { authors, title, venue, year } = paperData;
    const firstAuthor = authors.split(',')[0].trim().split(' ').pop().toLowerCase();
    const key = `${firstAuthor}${year}${title.split(' ')[0].toLowerCase()}`;
    
    return `@article{${key},
  title={${title}},
  author={${authors}},
  journal={${venue}},
  year={${year}}
}`;
}

// Initialize BibTeX buttons
function initializeBibTeXButtons() {
    document.querySelectorAll('.action-btn').forEach(btn => {
        if (btn.textContent.includes('BibTeX')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const paperEntry = this.closest('.paper-entry');
                const paperData = {
                    title: paperEntry.querySelector('.paper-title').textContent.trim(),
                    authors: paperEntry.querySelector('.paper-authors').textContent.trim(),
                    venue: paperEntry.querySelector('.paper-venue').textContent.trim().split(',')[0],
                    year: paperEntry.querySelector('.paper-venue').textContent.trim().split(',')[1]?.trim() || new Date().getFullYear()
                };
                
                const bibtex = generateBibTeX(paperData);
                
                // Create modal or copy to clipboard
                copyToClipboard(bibtex);
                showNotification('BibTeX copied to clipboard!');
            });
        }
    });
}

// Copy to clipboard utility
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-green);
        color: var(--bg-primary);
        padding: 15px 25px;
        border-radius: 4px;
        font-size: 0.9em;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth entrance animation
function initializeEntranceAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.paper-entry').forEach(paper => {
        observer.observe(paper);
    });
}

// Update research statistics dynamically
function updateResearchStats() {
    const papers = document.querySelectorAll('.paper-entry');
    const stats = {
        total: papers.length,
        published: document.querySelectorAll('.paper-entry[data-status="published"]').length,
        working: document.querySelectorAll('.paper-entry[data-status="working"]').length,
        wip: document.querySelectorAll('.paper-entry[data-status="wip"]').length
    };
    
    // Update filter counts
    document.querySelector('.filter-tab[data-filter="all"] .filter-count').textContent = `(${stats.total})`;
    document.querySelector('.filter-tab[data-filter="published"] .filter-count').textContent = `(${stats.published})`;
    document.querySelector('.filter-tab[data-filter="working"] .filter-count').textContent = `(${stats.working})`;
    document.querySelector('.filter-tab[data-filter="wip"] .filter-count').textContent = `(${stats.wip})`;
}

// Add CSS for notifications
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAbstractToggles();
    initializeMathPreviewToggles();
    initializeFilterTabs();
    initializeBibTeXButtons();
    initializeEntranceAnimations();
    updateResearchStats();
    addNotificationStyles();
    
    // Initialize MathJax if it's loaded
    if (window.MathJax) {
        window.MathJax.typesetPromise();
    }
});

// Export functions for potential use in other scripts
window.researchPage = {
    updateStats: updateResearchStats,
    showNotification: showNotification,
    copyToClipboard: copyToClipboard
};