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
  projects - View current research projects
  collab   - Learn about collaboration
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
    
    projects: () => {
        addOutput('🔬 Current Research Projects:');
        addOutput('────────────────────────────────');
        addOutput('1. Markov Dynamics and Contraction Mappings');
        addOutput('   - Exploring Du\'s theorem applications in economics');
        addOutput('2. Reinforcement Learning in Economic Models');
        addOutput('   - Developing RL algorithms for policy optimization');
        addOutput('3. GPU-Accelerated Dynamic Programming');
        addOutput('   - Building high-performance solvers in Julia');
        addOutput('\nThese projects keep me quite busy, but I love discussing ideas!');
    },
    
    collab: () => {
        addOutput('Thanks for your interest in collaboration!');
        addOutput('I\'m currently focused on my ongoing research projects and not actively seeking new collaborations.');
        addOutput('However, I\'m always happy to discuss ideas and stay connected.');
        addOutput('Feel free to send me a message using the "send" command or email me directly.');
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

// Interest descriptions
const interestDescriptions = {
    'RL in Economics': 'I apply reinforcement learning techniques to economic modeling, particularly in understanding agent behavior in dynamic markets and policy optimization.',
    'GPU Computing': 'Leveraging GPU acceleration for large-scale economic simulations and solving high-dimensional dynamic programming problems.',
    'Dynamic Programming': 'My core research focus - developing efficient algorithms for solving Bellman equations and exploring contraction mappings in economic contexts.',
    'Market Design': 'Interested in mechanism design and algorithmic approaches to creating efficient market structures.',
    'Climate Economics': 'Applying computational methods to climate-economy models and studying optimal carbon pricing policies.',
    'Open Source Tools': 'Contributing to and developing open-source software for computational economics, particularly in Julia and Python.'
};

// Show interest info in terminal
window.showInterestInfo = function(interest) {
    addOutput(`\n📚 ${interest}`);
    addOutput('─'.repeat(40));
    addOutput(interestDescriptions[interest] || 'Research area description coming soon...');
    addOutput('\nType "help" for more commands or click another topic to explore.');
    terminalInput.focus();
};

// Initialize terminal
document.addEventListener('DOMContentLoaded', function() {
    setupInput();
    
    // Focus on input when clicking terminal
    terminal.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Add initial welcome message
    setTimeout(() => {
        addOutput('\nWelcome! I\'m currently focused on my research projects, but feel free to explore and connect.');
        addOutput('Type "help" to see available commands or click on any research interest to learn more.\n');
    }, 500);
    
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