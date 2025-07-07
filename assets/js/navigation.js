/**
 * Navigation JavaScript - Command palette and navigation functionality
 */

/**
 * Command Palette functionality
 */
class CommandPalette {
    constructor() {
        this.commands = [
            { name: 'Go to About', action: () => this.navigateTo('#about'), icon: '👤' },
            { name: 'Go to Research', action: () => this.navigateTo('research.html'), icon: '📚' },
            { name: 'Go to Background', action: () => this.navigateTo('background.html'), icon: '🎓' },
            { name: 'Go to Code', action: () => this.navigateTo('coding.html'), icon: '💻' },
            { name: 'Go to Contact', action: () => this.navigateTo('contact.html'), icon: '📧' },
            { name: 'Toggle Theme', action: () => this.toggleTheme(), icon: '🎨' },
            { name: 'Copy Email', action: () => this.copyEmail(), icon: '📋' },
            { name: 'View GitHub', action: () => window.open('https://github.com/yourusername', '_blank'), icon: '🐙' }
        ];
        
        this.selectedIndex = 0;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.createPaletteHTML();
        this.bindEvents();
    }
    
    createPaletteHTML() {
        // Check if palette already exists
        if (document.getElementById('commandPalette')) return;
        
        const paletteHTML = `
            <div id="commandPalette" class="command-palette hidden">
                <div class="command-palette-inner">
                    <input type="text" id="commandInput" placeholder="Type a command..." autocomplete="off">
                    <div id="commandResults" class="command-results"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', paletteHTML);
        
        // Add styles
        this.addStyles();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .command-palette {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                z-index: var(--z-modal, 1000);
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 100px;
                backdrop-filter: blur(5px);
            }
            
            .command-palette.hidden {
                display: none;
            }
            
            .command-palette-inner {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-normal);
                width: 90%;
                max-width: 600px;
                box-shadow: var(--shadow-elevated);
            }
            
            #commandInput {
                width: 100%;
                padding: 20px;
                background: transparent;
                border: none;
                color: var(--text-primary);
                font-family: var(--font-mono);
                font-size: 1.1em;
                outline: none;
            }
            
            .command-results {
                max-height: 400px;
                overflow-y: auto;
                border-top: 1px solid var(--border-color);
            }
            
            .command-item {
                padding: 15px 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: background var(--transition-fast);
            }
            
            .command-item:hover,
            .command-item.selected {
                background: var(--bg-tertiary);
            }
            
            .command-item .icon {
                font-size: 1.2em;
            }
            
            .command-item .name {
                flex: 1;
                color: var(--text-primary);
            }
            
            .command-item .shortcut {
                color: var(--text-secondary);
                font-size: 0.9em;
            }
        `;
        document.head.appendChild(style);
    }
    
    bindEvents() {
        // Keyboard shortcut to open palette
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            if (this.isOpen) {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateSelection(-1);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateSelection(1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeSelected();
                }
            }
        });
        
        // Click outside to close
        document.getElementById('commandPalette').addEventListener('click', (e) => {
            if (e.target.id === 'commandPalette') {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        const palette = document.getElementById('commandPalette');
        const input = document.getElementById('commandInput');
        
        palette.classList.remove('hidden');
        input.value = '';
        input.focus();
        
        this.isOpen = true;
        this.selectedIndex = 0;
        this.renderResults();
        
        // Input event
        input.addEventListener('input', () => this.handleInput());
    }
    
    close() {
        document.getElementById('commandPalette').classList.add('hidden');
        this.isOpen = false;
    }
    
    handleInput() {
        const query = document.getElementById('commandInput').value.toLowerCase();
        const filtered = this.commands.filter(cmd => 
            cmd.name.toLowerCase().includes(query)
        );
        this.renderResults(filtered);
    }
    
    renderResults(commands = this.commands) {
        const results = document.getElementById('commandResults');
        results.innerHTML = '';
        
        commands.forEach((cmd, index) => {
            const item = document.createElement('div');
            item.className = 'command-item';
            if (index === this.selectedIndex) {
                item.classList.add('selected');
            }
            
            item.innerHTML = `
                <span class="icon">${cmd.icon}</span>
                <span class="name">${cmd.name}</span>
            `;
            
            item.addEventListener('click', () => {
                this.selectedIndex = index;
                this.executeSelected();
            });
            
            results.appendChild(item);
        });
    }
    
    navigateSelection(direction) {
        const items = document.querySelectorAll('.command-item');
        const maxIndex = items.length - 1;
        
        this.selectedIndex = Math.max(0, Math.min(maxIndex, this.selectedIndex + direction));
        
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }
    
    executeSelected() {
        const items = document.querySelectorAll('.command-item');
        if (items[this.selectedIndex]) {
            const query = document.getElementById('commandInput').value.toLowerCase();
            const filtered = this.commands.filter(cmd => 
                cmd.name.toLowerCase().includes(query)
            );
            
            if (filtered[this.selectedIndex]) {
                filtered[this.selectedIndex].action();
                this.close();
            }
        }
    }
    
    navigateTo(path) {
        if (path.startsWith('#')) {
            // Internal anchor
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // External page
            window.location.href = path;
        }
    }
    
    toggleTheme() {
        // Placeholder for theme toggle functionality
        console.log('Theme toggle not implemented yet');
    }
    
    copyEmail() {
        const email = 'longye.tian@anu.edu.au';
        window.CommonUtils?.copyToClipboard(email) || 
        navigator.clipboard.writeText(email).then(() => {
            console.log('Email copied to clipboard');
        });
    }
}

/**
 * Initialize navigation functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize command palette
    window.commandPalette = new CommandPalette();
    
    // Add current page indicator
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === './')) {
            link.classList.add('current');
        }
    });
});