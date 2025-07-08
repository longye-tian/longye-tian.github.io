// Contact Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Animate status dot
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.style.transform = 'scale(' + (Math.random() * 0.3 + 0.9) + ')';
        }, 2000);
    }
    
    // Add hover effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Make phone number copyable
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const phoneNumber = this.textContent.trim();
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    // Create temporary tooltip
                    const tooltip = document.createElement('span');
                    tooltip.textContent = 'Copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--accent-green);
                        color: var(--bg-primary);
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 0.8em;
                        top: -30px;
                        left: 50%;
                        transform: translateX(-50%);
                        animation: fadeOut 2s forwards;
                    `;
                    this.parentElement.style.position = 'relative';
                    this.parentElement.appendChild(tooltip);
                    
                    setTimeout(() => tooltip.remove(), 2000);
                });
            }
        });
    }
    
    // Add copy email functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const email = this.textContent.trim();
                navigator.clipboard.writeText(email).then(() => {
                    // Create temporary tooltip
                    const tooltip = document.createElement('span');
                    tooltip.textContent = 'Email copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--accent-green);
                        color: var(--bg-primary);
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 0.8em;
                        top: -30px;
                        left: 50%;
                        transform: translateX(-50%);
                        animation: fadeOut 2s forwards;
                    `;
                    this.parentElement.style.position = 'relative';
                    this.parentElement.appendChild(tooltip);
                    
                    setTimeout(() => tooltip.remove(), 2000);
                });
            }
        });
    }
    
    // Add fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateX(-50%) translateY(0); }
            70% { opacity: 1; }
            100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});