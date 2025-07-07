# Longye Tian's Academic Website

A modern, responsive academic portfolio website with a VS Code dark theme aesthetic.

## Project Structure

```
longye-web/
├── index.html              # Homepage
├── pages/                  # HTML pages
│   ├── research.html      # Research portfolio
│   ├── background.html    # Academic background
│   ├── coding.html        # Coding projects
│   └── contact.html       # Contact information
├── assets/                 # Static assets
│   ├── css/               # Stylesheets
│   │   ├── main.css       # Common styles
│   │   ├── variables.css  # CSS custom properties
│   │   └── pages/         # Page-specific styles
│   │       ├── index.css
│   │       ├── research.css
│   │       ├── background.css
│   │       ├── coding.css
│   │       └── contact.css
│   ├── js/                # JavaScript files
│   │   ├── main.js        # Common functionality
│   │   ├── navigation.js  # Command palette
│   │   └── pages/         # Page-specific scripts
│   │       ├── index.js
│   │       ├── research.js
│   │       ├── background.js
│   │       ├── coding.js
│   │       └── contact.js
│   └── images/            # Image assets (placeholder)
├── CLAUDE.md              # Claude Code guidance
└── README.md              # This file
```

## Features

### Global Features
- **VS Code Dark Theme**: Consistent dark theme across all pages
- **Responsive Design**: Mobile-friendly layouts
- **Smooth Animations**: Entrance animations and transitions
- **Command Palette**: Keyboard navigation (Ctrl/Cmd + K) on homepage

### Page-Specific Features

#### Homepage (`index.html`)
- Typing animation for tagline
- Interactive canvas demo for economic models
- Git-style research timeline
- Command palette navigation

#### Research (`pages/research.html`)
- Paper filtering by publication status
- Expandable abstracts
- BibTeX citation generation
- LaTeX equation rendering with MathJax

#### Background (`pages/background.html`)
- Animated timeline
- Skills grid with proficiency indicators
- Teaching experience cards
- Language proficiency display

#### Coding (`pages/coding.html`)
- Project filtering system
- GitHub statistics display
- ASCII-style contribution graph
- Featured project showcase

#### Contact (`pages/contact.html`)
- Interactive terminal interface
- Command-based messaging system
- Office hours widget
- Availability status indicator

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript**: ES6+, Intersection Observer API
- **MathJax**: LaTeX equation rendering
- **No build tools**: Pure static files

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Development

### Local Development
1. Clone the repository
2. Open `index.html` in a browser
3. Or use a local server: `python -m http.server 8000`

### Adding New Pages
1. Create HTML file in `pages/` directory
2. Create corresponding CSS in `assets/css/pages/`
3. Create corresponding JS in `assets/js/pages/`
4. Link to common assets: `main.css` and `main.js`
5. Update navigation in all pages

### Customization
- Edit `variables.css` to change color scheme
- Modify `main.css` for global style changes
- Page-specific changes in respective CSS/JS files

## Deployment

This is a static website that can be deployed on any web server:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

Simply upload all files maintaining the directory structure.

## Maintenance

- Keep navigation consistent across all pages
- Test responsive design on multiple devices
- Ensure all interactive features work without JavaScript (graceful degradation)
- Validate HTML and CSS regularly
- Check console for JavaScript errors

## License

This website template is available for academic use. Please customize the content for your own use.

## Contact

For questions about this website structure, please refer to the academic portfolio documentation or create an issue in the repository.