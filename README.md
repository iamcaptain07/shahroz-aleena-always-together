# Marriage Proposal Website

A beautiful, responsive, and accessible three-page website for a marriage proposal with a New Year theme. Built with React, Tailwind CSS, and Framer Motion.

## Features

- **Three Pages**: Proposal, Our Story (timeline), and Reply/RSVP
- **Responsive Design**: Mobile-first approach with hamburger navigation
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Animations**: Smooth page transitions and celebratory confetti
- **Interactive Timeline**: Add, edit, and manage relationship milestones
- **Local Storage**: Persists timeline entries and replies locally
- **New Year Theme**: Elegant design with gold accents and festive elements

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Framer Motion** - Animation library
- **canvas-confetti** - Celebration confetti animation
- **Google Fonts** - Playfair Display (headings) and Inter (body)

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Customization

### Changing the Proposal Message

Edit the message in `src/components/HeroProposalCard.jsx`. The exact message is stored in the `proposalMessage` constant.

### Changing the Year

Edit the `year` field in `src/config/site.json`:

```json
{
  "year": "2026"
}
```

### Customizing Colors

Colors can be customized in two ways:

1. **Tailwind Config** (`tailwind.config.js`): Edit the color values in the `theme.extend.colors` section:
   ```js
   colors: {
     navy: '#071429',
     gold: '#D4AF37',
     blush: '#FFCAD4',
     ivory: '#F8F1E7',
   }
   ```

2. **Site Config** (`src/config/site.json`): The color values are also stored here for reference.

### Replacing Images

Replace the placeholder images in the `public` folder:

- `public/fireworks.svg` - Background fireworks/sparkles decoration
- `public/heart.svg` - Heart icon used in the proposal card

The images are referenced in components, so ensure filenames match or update the import paths.

### Customizing Names and Text

Edit `src/config/site.json` to change:
- Names (proposer and recipient)
- Button labels
- Banner text
- Other customizable strings

### Adding Custom Timeline Entries

Users can add timeline entries through the UI on the Story page. To pre-populate with different default entries, edit the `defaultEntries` array in `src/components/Timeline.jsx`.

## Project Structure

```
moon/
├── public/              # Static assets
│   ├── fireworks.svg
│   └── heart.svg
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── HeroProposalCard.jsx
│   │   ├── Timeline.jsx
│   │   ├── TimelineItem.jsx
│   │   ├── ReplyForm.jsx
│   │   └── ConfettiController.jsx
│   ├── pages/           # Page components
│   │   ├── ProposalPage.jsx
│   │   ├── StoryPage.jsx
│   │   └── ReplyPage.jsx
│   ├── config/          # Configuration files
│   │   └── site.json
│   ├── styles/          # Global styles
│   │   └── global.css
│   ├── utils/           # Utility functions
│   │   └── localStorage.js
│   ├── App.jsx          # Main app component with routing
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Browser Support

Modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties

## License

This project is created for personal use. Feel free to customize and adapt it for your own proposal.

## Notes

- All data (timeline entries and replies) is stored locally in the browser's localStorage
- The confetti animation requires JavaScript to be enabled
- The site is designed to work without a backend server
- For production deployment, consider using a static hosting service like Vercel, Netlify, or GitHub Pages

