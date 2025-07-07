// Contact Page Terminal Functionality

// Terminal elements
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminal-input');
const currentLine = document.getElementById('current-line');
let messageData = {};
let currentStep = 'initial';

// Terminal commands
const commands = {
    help: () => {
        addOutput(`Available commands:
  help     - Show this help message
  clear    - Clear terminal
  send     - Send a message
  collab   - Propose a collaboration
  meeting  - Schedule a meeting
  cv       - Request my CV
  exit     - Close terminal`);
    },
    
    clear: () => {
        terminal.innerHTML = `
            <div class="terminal-line" id="current-line">
                <span class="terminal-prompt">$</span>
                <input type="text" class="terminal-input" id="terminal-input" autofocus>
                <span class="terminal-cursor"></span>
            </div>
        `;
        setupInput();
    },
    
    send: () => {
        currentStep = 'name';
        addOutput('Starting message composer...');
        addOutput('What\'s your name?');
    },
    
    collab: () => {
        currentStep = 'collab_type';
        addOutput('Great! I\'m always interested in collaborations.');
        addOutput('What type of collaboration are you interested in?');
        addOutput('1) Research project');
        addOutput('2) Open source contribution');
        addOutput('3) Conference/workshop');
        addOutput('4) Other');
    },
    
    meeting: () => {
        addOutput('Opening calendar...');
        setTimeout(() => {
            addOutput('Available slots this week:');
            addOutput('- Tuesday 2:00 PM - 4:00 PM AEDT');
            addOutput('- Thursday 10:00 AM - 12:00 PM AEDT');
            addOutput('Please email me with your preferred time.');
        }, 1000);
    },
    
    cv: () => {
        addOutput('Generating CV download link...');
        setTimeout(() => {
            addOutput('📄 Download CV: <a href="#" style="color: var(--accent-blue);">longye_tian_cv.pdf</a>');
        }, 500);
    },
    
    exit: () => {
        addOutput('Goodbye! Feel free to email me at longye.tian@anu.edu.au');
        setTimeout(() => {
            terminalInput.disabled = true;
        }, 1000);
    }
};

// Add output to terminal
function addOutput(text) {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    outputDiv.innerHTML = text;
    terminal.insertBefore(outputDiv, currentLine);
    terminal.scrollTop = terminal.scrollHeight;
}

// Add command line to terminal
function addCommandLine(command) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    lineDiv.innerHTML = `<span class="terminal-prompt">$</span> ${command}`;
    terminal.insertBefore(lineDiv, currentLine);
}

// Setup input handler
function setupInput() {
    terminalInput = document.getElementById('terminal-input');
    terminalInput.addEventListener('keypress', handleInput);
    terminalInput.focus();
}

// Handle input
function handleInput(e) {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        if (input) {
            addCommandLine(input);
            processCommand(input);
            terminalInput.value = '';
        }
    }
}

// Process command
function processCommand(input) {
    if (currentStep === 'initial') {
        if (commands[input]) {
            commands[input]();
        } else {
            addOutput(`Command not found: ${input}. Type 'help' for available commands.`);
        }
    } else if (currentStep === 'name') {
        messageData.name = input;
        currentStep = 'email';
        addOutput(`Nice to meet you, ${input}!`);
        addOutput('What\'s your email address?');
    } else if (currentStep === 'email') {
        messageData.email = input;
        currentStep = 'message';
        addOutput('What would you like to discuss?');
    } else if (currentStep === 'message') {
        messageData.message = input;
        sendMessage();
    } else if (currentStep === 'collab_type') {
        messageData.collabType = input;
        currentStep = 'collab_details';
        addOutput('Interesting! Tell me more about your idea:');
    } else if (currentStep === 'collab_details') {
        messageData.collabDetails = input;
        addOutput('Thanks for sharing! I\'ll review your proposal and get back to you soon.');
        addOutput('Please leave your email for follow-up:');
        currentStep = 'collab_email';
    } else if (currentStep === 'collab_email') {
        messageData.email = input;
        sendMessage();
    }
}

// Send message
function sendMessage() {
    addOutput('Sending message...');
    
    // Simulate sending
    setTimeout(() => {
        addOutput('✓ Message sent successfully!');
        document.getElementById('response-message').classList.add('show');
        currentStep = 'initial';
        
        // Reset after 3 seconds
        setTimeout(() => {
            messageData = {};
            addOutput('Type \'help\' for more options or \'clear\' to start fresh.');
        }, 3000);
    }, 1500);
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', function() {
    setupInput();
    
    // Focus on input when clicking terminal
    terminal.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Interest tags interaction
    document.querySelectorAll('.interest-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const interest = this.textContent;
            terminalInput.value = `collab`;
            terminalInput.focus();
            
            // Trigger enter key
            const event = new KeyboardEvent('keypress', {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });
            terminalInput.dispatchEvent(event);
            
            setTimeout(() => {
                terminalInput.value = `I'm interested in collaborating on ${interest}`;
            }, 1000);
        });
    });
    
    // Animate status dot
    const statusDot = document.querySelector('.status-dot');
    setInterval(() => {
        statusDot.style.transform = 'scale(' + (Math.random() * 0.3 + 0.9) + ')';
    }, 2000);
    
    // Add some fun easter eggs
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                addOutput('🎮 Konami Code activated! You found the easter egg!');
                addOutput('Fun fact: I sometimes use game theory to model economic behavior.');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});