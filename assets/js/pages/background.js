// Background Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Skill level animations
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dots = this.querySelectorAll('.skill-dot.filled');
            dots.forEach((dot, index) => {
                dot.style.transform = 'scale(0)';
                setTimeout(() => {
                    dot.style.transition = 'transform 0.3s ease';
                    dot.style.transform = 'scale(1)';
                }, index * 50);
            });
        });
    });
    
    // Download button functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would download the PDF
            const terminal = document.querySelector('.terminal-cursor');
            if (terminal) {
                terminal.textContent = 'longye@anu:~/background$ wget cv_longye_tian.pdf';
                setTimeout(() => {
                    terminal.textContent = 'longye@anu:~/background$ ';
                }, 2000);
            }
        });
    }
    
    // Course card hover effects
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '4px';
            this.style.borderLeftColor = 'var(--accent-purple)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '1px';
            this.style.borderLeftColor = 'var(--border-color)';
        });
    });
    
    // Timeline item entrance animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Skill category hover effects
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            const title = this.querySelector('.skill-category-title');
            if (title) {
                title.style.color = 'var(--accent-teal)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            const title = this.querySelector('.skill-category-title');
            if (title) {
                title.style.color = 'var(--accent-yellow)';
            }
        });
    });
    
    // Language card animations
    document.querySelectorAll('.language-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Add typing animation to terminal cursor
    const terminalCursor = document.querySelector('.terminal-cursor');
    if (terminalCursor) {
        let typingText = 'longye@anu:~/background$ ';
        let currentText = '';
        let index = 0;
        
        function typeText() {
            if (index < typingText.length) {
                currentText += typingText[index];
                terminalCursor.textContent = currentText;
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing animation on page load
        terminalCursor.textContent = '';
        setTimeout(typeText, 500);
    }
    
    // Add progress animation to skill dots
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dots = entry.target.querySelectorAll('.skill-dot.filled');
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.transition = 'all 0.3s ease';
                        dot.style.opacity = '0';
                        dot.style.transform = 'scale(0)';
                        
                        setTimeout(() => {
                            dot.style.opacity = '1';
                            dot.style.transform = 'scale(1)';
                        }, 50);
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });
});