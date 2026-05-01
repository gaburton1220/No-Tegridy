# No-Tegridy Fantasy Football

A fantasy football league website featuring power rankings, team standings, player profiles, draft recaps, and league history.

## Live Site

Visit us at: [no-tegridy.org](https://no-tegridy.org)

## About

No-Tegridy Fantasy Football is a static website built for tracking our fantasy football league. The site includes:

- Weekly game lines and matchup predictions
- Power rankings and team standings
- League member profiles
- Photo gallery
- Draft recaps and analysis
- Historical league data
- Weekly recaps, standings, and league history updates

## Project Structure

```
No-Tegridy/
├── index.html                    # Home page with weekly game lines
├── standings.html                # Power rankings and standings
├── group.html                    # League member profiles
├── pictures.html                 # Photo gallery
├── draft-recap.html              # Annual draft analysis
├── roasting-isaac.html           # Special roast page
├── past-seasons.html             # Historical league data
├── styles.css                    # Main stylesheet
├── script.js                     # JavaScript for animations
├── favicon-32x32.png             # Site favicon
├── CNAME                         # GitHub Pages custom domain
└── README.md                     # This file
```

## Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with animations, gradients, and responsive design
- **JavaScript** - Vanilla JS for particle animations
- **Google Fonts** - Bebas Neue and Orbitron typefaces
- **GitHub Pages** - Free hosting with custom domain

## Features

### Design
- Animated gradient background
- Floating particle effects
- Responsive design for mobile, tablet, and desktop
- Glassmorphism UI with backdrop filters
- Smooth animations and hover effects

### Accessibility
- ARIA labels and landmarks
- Skip links for keyboard navigation
- Semantic HTML structure
- Screen reader-friendly content

### Performance
- External CSS and JavaScript for caching
- Optimized font loading with preconnect
- Mobile-optimized responsive design

## Local Development

Since this is a static website, you can view it locally by:

1. Clone the repository:
   ```bash
   git clone https://github.com/gaburton1220/No-Tegridy.git
   cd No-Tegridy
   ```

2. Open any HTML file in your browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

Alternatively, use a local web server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Then visit http://localhost:8000
```

## Deployment

This site is automatically deployed via GitHub Pages. Any commits to the main branch will be reflected on the live site within a few minutes.

### Custom Domain Setup

The site uses a custom domain configured via the `CNAME` file. GitHub Pages automatically handles SSL/TLS certificates via Let's Encrypt.

## Making Updates

### Updating Weekly Content

To update game lines, power rankings, or other weekly content:

1. Edit the relevant HTML file
2. Update the data in the tables or content sections
3. Commit and push your changes
4. Changes will be live within minutes

### Modifying Styles

All styles are centralized in `styles.css`. Make changes there to affect all pages consistently.

### Adding New Pages

1. Create a new HTML file
2. Include the standard header with links to `styles.css` and `script.js`
3. Add navigation links to all pages
4. Follow the existing structure for consistency

## Browser Support

The site works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: Some CSS features like `backdrop-filter` may have limited support on older browsers but degrade gracefully.

## Contributing

This is a private league website, but if you're a league member:

1. Make sure you have access to the repository
2. Create a new branch for your changes
3. Test your changes locally
4. Submit a pull request with a clear description

## License

This is a private project for the No-Tegridy Fantasy Football League.

## Credits

- Built and maintained by league members
- Established 2021
- Powered by tall boy shotguns

---

**Est. 2021 • Champions Forever • Legends Never Die**
