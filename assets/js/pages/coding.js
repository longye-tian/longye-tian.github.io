// Coding Page JavaScript

// Project filtering functionality
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
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

// Animate contribution graph on hover
function initContributionGraph() {
    const contributionGraph = document.querySelector('.contribution-grid');
    if (contributionGraph) {
        contributionGraph.addEventListener('mouseover', function(e) {
            if (e.target.textContent === '▪' || e.target.textContent === '▫') {
                const originalChar = e.target.textContent;
                e.target.textContent = '●';
                e.target.style.color = '#39d353';
                setTimeout(() => {
                    e.target.textContent = originalChar;
                    e.target.style.color = '';
                }, 500);
            }
        });
    }
}

// Animate GitHub statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 30);
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            stat.textContent = currentValue;
        }, 50);
    });
}

// Add entrance animations for cards
function initEntranceAnimations() {
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
    
    document.querySelectorAll('.project-card, .featured-project').forEach(el => {
        observer.observe(el);
    });
}

// Code preview syntax highlighting enhancement
function initCodePreview() {
    document.querySelectorAll('.code-preview').forEach(preview => {
        preview.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--accent-green)';
        });
        
        preview.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border-color)';
        });
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initProjectFiltering();
    initContributionGraph();
    animateStats();
    initEntranceAnimations();
    initCodePreview();
});