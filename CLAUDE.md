# CLAUDE.md - Project Context for longye-web

## Current State (As of last update)

### Recently Completed Tasks
1. **Code Page Updates**:
   - Changed all section titles to green color theme
   - Removed git log section completely
   - Removed debug API and clear cache buttons
   - Created fancy contribution activity graph with:
     - Gradient background and glow effects
     - Total contributions and streak statistics
     - Interactive tooltips
     - Modern glass-morphism design

2. **Contact Page Updates**:
   - Removed terminal interface
   - Removed research interests section
   - Updated office: Room 1165, Copland Building, Research School of Economics
   - Updated phone: +61 434 416 144
   - Simplified to two cards: Direct Contact and Office Hours
   - Status changed to "Currently focused on ongoing projects"

3. **GitHub Integration**:
   - Username: `longye-tian`
   - Implemented caching system (30 min duration) to handle API rate limits
   - Cache stores user data, repos, and events

## Pending/Current Tasks

### Public Repositories Display
- User has deleted some repositories from GitHub
- The code page shows cached data for 30 minutes
- Need to ensure the repository list reflects current public repos
- **Note**: The system already fetches repos dynamically from GitHub API, just need cache to refresh

### Known Issues
1. **Rate Limiting**: GitHub API allows 60 requests/hour for unauthenticated requests
2. **Caching**: 30-minute cache may show outdated repos after deletions

## Technical Details

### File Structure
```
/Users/longye/Desktop/longye-web/
├── index.html
├── pages/
│   ├── coding.html
│   ├── contact.html
│   ├── research.html
│   └── study-notes.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── variables.css
│   │   └── pages/
│   ├── js/
│   │   ├── main.js
│   │   ├── navigation.js
│   │   └── pages/
│   └── study-notes/ (PDFs)
├── 404.html
├── README.md
└── sitemap.xml
```

### Key Functions in coding.html
- `loadGitHubData()`: Fetches user stats and repositories
- `loadGitHubEvents()`: Fetches events for activity graph
- `generateActivityGraph()`: Creates the contribution visualization
- `getCachedData()` / `setCachedData()`: Cache management

### Cache Management
- Cache key: `github_data_cache`
- Duration: 30 minutes
- Stores: user data, repositories, events
- Clear cache: `localStorage.removeItem('github_data_cache')`

## Important URLs
- Live site: https://longye-tian.github.io
- GitHub: https://github.com/longye-tian
- Repository: https://github.com/longye-tian/longye-tian.github.io

## Next Steps After Auto-compact
1. Check if repositories are displaying correctly
2. If showing old repos, clear cache or wait for expiration
3. Verify all stats are updated (repos count, stars, etc.)