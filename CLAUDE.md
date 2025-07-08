# CLAUDE.md - Personal Website Development Guide

## Project Overview
**Repository**: https://github.com/longye-tian/longye-tian.github.io  
**Live Site**: https://longye-tian.github.io  
**Owner**: Longye Tian (田垄业)  
**Current Theme**: Dark mode only (VS Code inspired)

## 🎯 Next Session Goal: Implement Light Mode

### Primary Objective
Create a well-designed light mode theme that:
1. Maintains the professional, academic aesthetic
2. Provides seamless theme switching
3. Preserves all current functionality
4. Ensures excellent readability and contrast

### Design Requirements for Light Mode

#### Color Palette Suggestions
```css
/* Light Mode Variables to Implement */
--bg-primary-light: #ffffff;
--bg-secondary-light: #f5f5f5;
--bg-tertiary-light: #e0e0e0;
--text-primary-light: #1e1e1e;
--text-secondary-light: #606060;
--accent-blue-light: #0066cc;
--accent-green-light: #28a745;
--accent-yellow-light: #ffc107;
--accent-purple-light: #6f42c1;
--border-color-light: #d1d5db;
```

#### Key Considerations
1. **Contrast Ratios**: Ensure WCAG AA compliance
2. **Code Blocks**: Light syntax highlighting (GitHub style)
3. **Shadows**: Softer shadows for light mode
4. **Hover States**: Subtle color changes
5. **Activity Graph**: Adjust green shades for light background

### Implementation Strategy

#### 1. CSS Architecture
- Add theme variables in `variables.css`
- Create `:root[data-theme="light"]` selector
- Update all color references to use CSS variables

#### 2. Theme Toggle Component
- Add toggle button in navigation (sun/moon icon)
- Store preference in localStorage
- Apply theme on page load
- Smooth transition between themes

#### 3. Files to Update
```
Priority 1 (Core styling):
- /assets/css/variables.css (add light theme variables)
- /assets/css/main.css (update color references)
- /assets/js/main.js (add theme toggle logic)

Priority 2 (Page-specific):
- /assets/css/pages/index.css
- /assets/css/pages/coding.css
- /assets/css/pages/contact.css
- /assets/css/pages/research.css

Priority 3 (Components):
- Navigation styling
- Footer styling
- Card components
- Activity graph colors
```

### Technical Implementation Details

#### Theme Toggle Function (to add in main.js)
```javascript
// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
```

#### CSS Variable Structure (to add in variables.css)
```css
/* Dark theme (existing) */
:root {
    /* current variables */
}

/* Light theme (to add) */
:root[data-theme="light"] {
    /* override variables for light mode */
}
```

### Component-Specific Notes

#### 1. Code Page Activity Graph
- Light mode needs softer green shades
- Consider using blue/purple for light mode
- Update tooltip styling for light background

#### 2. Navigation Bar
- Currently: #252526 background
- Light mode: #ffffff with subtle border

#### 3. Cards and Containers
- Add subtle shadows for depth in light mode
- Use light gray borders instead of dark

#### 4. Syntax Highlighting
- Research notes and code blocks need light theme
- Consider using Prism.js light theme or GitHub style

### Testing Checklist
- [ ] Theme persists across page navigation
- [ ] All text remains readable (contrast check)
- [ ] Hover states work correctly
- [ ] Activity graph is visible and attractive
- [ ] Code blocks are readable
- [ ] Images/icons adapt or remain visible
- [ ] Smooth transition between themes
- [ ] Mobile responsive in both themes

### Current Site Structure
```
Pages:
- Home (index.html) - Introduction, education timeline
- Research (research.html) - Academic papers (currently empty)
- Study Notes (study-notes.html) - 8 PDF notes on various topics
- Code (coding.html) - GitHub repos, activity graph, language stats
- Contact (contact.html) - Contact info, office hours

Features:
- GitHub API integration (cached for 30 min)
- Command palette (Ctrl+K)
- Responsive design
- Activity contribution graph
- Auto-refresh repositories
```

### Additional Enhancements to Consider
1. **Transition Effects**: Smooth color transitions when switching themes
2. **Theme Toggle Animation**: Rotating sun/moon icon
3. **System Preference Detection**: Auto-detect OS dark/light mode
4. **Accessibility**: Ensure both themes meet WCAG guidelines

### Resources
- Current colors are VS Code dark theme inspired
- Consider popular light themes: GitHub, Solarized Light, One Light
- CSS Variables MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- Theme switching best practices: https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/

## Session Start Instructions
1. Read this entire document
2. Check current dark mode implementation in variables.css
3. Plan light mode color palette
4. Implement theme toggle functionality first
5. Update CSS progressively, testing each page
6. Ensure smooth transitions and persistence

## Important Notes
- Maintain all current functionality
- Don't break existing dark mode
- Test on multiple browsers
- Consider user preference persistence
- Keep professional academic aesthetic

---
*Last Updated: 2025-07-08*  
*Current Status: Light mode successfully implemented with theme toggle functionality*

## Implementation Summary

✅ **Completed Tasks:**
1. Added comprehensive light theme variables to `variables.css`
2. Implemented theme toggle functionality in `main.js` with localStorage persistence
3. Added theme toggle button (moon/sun icon) to all navigation bars
4. Updated all CSS files to use CSS variables instead of hard-coded colors
5. Added smooth transitions between theme changes
6. Ensured theme persistence across page navigation
7. Updated activity graph colors for both light and dark themes
8. Fixed all hard-coded shadows to use theme-appropriate variables

**Key Features:**
- Theme preference saved in localStorage
- Smooth 0.3s transitions when switching themes
- Accessible toggle button with rotating icon animation
- All pages fully support both light and dark modes
- Activity graph adapts colors based on theme