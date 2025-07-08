/**
 * Index Page Specific JavaScript
 */

// Command Palette functionality
const commandPalette = {
    element: null,
    input: null,
    results: null,
    
    init() {
        this.element = document.getElementById('commandPalette');
        this.input = document.getElementById('commandInput');
        this.results = document.getElementById('commandResults');
        
        if (!this.element || !this.input || !this.results) return;
        
        // Setup keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            if (e.key === 'Escape') {
                this.close();
            }
        });
        
        // Setup command items
        this.results.querySelectorAll('.command-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                this.handleCommand(action);
                this.close();
            });
        });
        
        // Setup search functionality
        this.input.addEventListener('input', (e) => {
            this.filterCommands(e.target.value);
        });
    },
    
    toggle() {
        this.element.classList.toggle('active');
        if (this.element.classList.contains('active')) {
            this.input.focus();
            this.input.value = '';
        }
    },
    
    close() {
        this.element.classList.remove('active');
    },
    
    handleCommand(action) {
        switch(action) {
            case 'research':
                window.location.href = 'pages/research.html';
                break;
            case 'study-notes':
                window.location.href = 'pages/study-notes.html';
                break;
            case 'contact':
                window.location.href = 'pages/contact.html';
                break;
            case 'github':
                window.open('https://github.com/longyetian', '_blank');
                break;
            case 'cv':
                console.log('Downloading CV...');
                break;
        }
    },
    
    filterCommands(query) {
        const items = this.results.querySelectorAll('.command-item');
        const lowerQuery = query.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(lowerQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
};

// Navigation scroll indicator
const navigationScroll = {
    sections: [],
    navLinks: [],
    
    init() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        if (this.sections.length === 0 || this.navLinks.length === 0) return;
        
        // Setup smooth scrolling
        this.navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Update current section on scroll
        window.addEventListener('scroll', () => {
            this.updateCurrentSection();
        });
        
        // Initial update
        this.updateCurrentSection();
    },
    
    updateCurrentSection() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('current');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('current');
            }
        });
    }
};

// Canvas Demo
const canvasDemo = {
    canvas: null,
    ctx: null,
    animationId: null,
    
    init() {
        this.canvas = document.getElementById('econ-demo');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.drawStaticGraph();
        
        // Add hover interactivity
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    },
    
    drawStaticGraph() {
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw axes
        ctx.strokeStyle = '#569cd6';
        ctx.lineWidth = 2;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 350);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(50, 350);
        ctx.lineTo(550, 350);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#d4d4d4';
        ctx.font = '14px monospace';
        ctx.fillText('Price', 10, 40);
        ctx.fillText('Quantity', 500, 380);
        
        // Draw supply curve
        ctx.strokeStyle = '#4ec9b0';
        ctx.beginPath();
        ctx.moveTo(100, 300);
        ctx.quadraticCurveTo(300, 200, 500, 100);
        ctx.stroke();
        
        // Draw demand curve
        ctx.strokeStyle = '#dcdcaa';
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.quadraticCurveTo(300, 200, 500, 300);
        ctx.stroke();
        
        // Equilibrium point
        ctx.fillStyle = '#d16969';
        ctx.beginPath();
        ctx.arc(300, 200, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Legend
        ctx.fillStyle = '#4ec9b0';
        ctx.fillText('Supply', 450, 120);
        ctx.fillStyle = '#dcdcaa';
        ctx.fillText('Demand', 450, 280);
        
        // Equilibrium label
        ctx.fillStyle = '#d16969';
        ctx.fillText('Equilibrium', 250, 180);
    },
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if near equilibrium point
        const distance = Math.sqrt(Math.pow(x - 300, 2) + Math.pow(y - 200, 2));
        
        if (distance < 20) {
            this.canvas.style.cursor = 'pointer';
            this.highlightEquilibrium();
        } else {
            this.canvas.style.cursor = 'default';
            this.drawStaticGraph();
        }
    },
    
    highlightEquilibrium() {
        this.drawStaticGraph();
        
        const ctx = this.ctx;
        
        // Draw highlight circle
        ctx.strokeStyle = '#d16969';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(300, 200, 15, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw price and quantity lines
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 1;
        
        // Price line
        ctx.beginPath();
        ctx.moveTo(50, 200);
        ctx.lineTo(300, 200);
        ctx.stroke();
        
        // Quantity line
        ctx.beginPath();
        ctx.moveTo(300, 200);
        ctx.lineTo(300, 350);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#d16969';
        ctx.fillText('P*', 20, 205);
        ctx.fillText('Q*', 295, 370);
    }
};

// Typing animation enhancement
const typingAnimation = {
    elements: [],
    
    init() {
        this.elements = document.querySelectorAll('.typing-text');
        
        this.elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            // Start typing after a short delay
            setTimeout(() => {
                element.textContent = text;
                element.style.width = '100%';
            }, 500);
        });
    },
    
    addDynamicTyping(selector, phrases, speed = 100, delay = 2000) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, delay);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? speed / 2 : speed);
            }
        }
        
        type();
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize command palette
    commandPalette.init();
    
    // Initialize navigation scroll
    navigationScroll.init();
    
    // Initialize canvas demo
    canvasDemo.init();
    
    // Initialize typing animations
    typingAnimation.init();
    
    // Add any page-specific animations
    const fadeElements = document.querySelectorAll('.info-card, .git-timeline, .code-block');
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize research timeline dates
    const commitDates = document.querySelectorAll('.commit-date');
    commitDates.forEach(date => {
        // You could enhance this to calculate real relative times
        const dateText = date.textContent;
        date.setAttribute('title', `Last updated: ${dateText}`);
    });
});

// Export for potential use in other scripts
window.IndexPage = {
    commandPalette,
    navigationScroll,
    canvasDemo,
    typingAnimation
};