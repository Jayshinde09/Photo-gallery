# Real-Time Photo Gallery

A multi-user real-time image interaction web application built with React, InstantDB, and Unsplash API. Users can browse stunning photos, add emoji reactions, comment on images, and see all interactions update instantly across all connected users.

## 🚀 Live Demo

**Deployed Application**: [Coming Soon]

## ✨ Features

- **Image Gallery**: Browse beautiful images from Unsplash with smooth pagination
- **Real-Time Emoji Reactions**: Add emoji reactions that sync instantly across all users
- **Real-Time Comments**: Comment on images with instant updates for everyone
- **Live Activity Feed**: Global feed showing all interactions in real-time
- **Multi-User Support**: Test with multiple tabs/devices to see real-time synchronization
- **Optimistic Updates**: Instant UI feedback before server confirmation
- **Smooth Animations**: Professional animations and transitions throughout

## 🛠️ Tech Stack

- **Frontend**: React 18 (Functional Components)
- **Styling**: Tailwind CSS + Custom CSS
- **Real-Time Database**: InstantDB
- **Image API**: Unsplash API
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/foto-gallery.git
cd foto-gallery
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
VITE_INSTANTDB_APP_ID=your_instantdb_app_id
```

4. Start development server
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## 🔑 Getting API Keys

### Unsplash API
1. Go to https://unsplash.com/developers
2. Register as a developer
3. Create a new application
4. Copy the Access Key

### InstantDB
1. Go to https://www.instantdb.com/
2. Sign up and create a new app
3. Copy the App ID

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Gallery/          # Image grid and modal components
│   │   ├── ImageGrid.jsx
│   │   ├── ImageCard.jsx
│   │   └── ImageModal.jsx
│   ├── Feed/             # Activity feed components
│   │   └── FeedSection.jsx
│   └── Interactions/     # Emoji and comment components
│       ├── EmojiReactions.jsx
│       ├── CommentSection.jsx
│       └── interactions.css
├── hooks/                # Custom React hooks
│   └── useUnsplashImages.js
├── stores/               # Zustand stores
│   ├── userStore.js
│   ├── galleryStore.js
│   └── modalStore.js
├── lib/                  # InstantDB client
│   └── instantdb.js
├── utils/                # Helper functions
│   ├── reactions.js
│   └── comments.js
├── styles/               # Global styles
│   └── main.css
└── App.jsx               # Main app component
```

## 📊 InstantDB Schema

### Collections

**reactions**
```javascript
{
  id: string,
  imageId: string,
  emoji: string,
  userId: string,
  username: string,
  createdAt: timestamp
}
```

**comments**
```javascript
{
  id: string,
  imageId: string,
  text: string,
  userId: string,
  username: string,
  createdAt: timestamp
}
```

**feed_events**
```javascript
{
  id: string,
  type: 'reaction' | 'comment',
  imageId: string,
  userId: string,
  username: string,
  content: string,
  createdAt: timestamp
}
```

## 🎯 Key Features Implementation

### Real-Time Sync
- InstantDB real-time subscriptions for instant updates
- Image-level subscriptions filtered by imageId
- Global feed subscription for all events
- Optimistic updates for better UX

### State Management
- **Zustand**: User identity and UI state (modals, pagination)
- **React Query**: Unsplash API data fetching and caching
- **InstantDB Hooks**: Real-time data subscriptions

### Performance Optimizations
- `useMemo` for expensive computations
- `useCallback` for event handlers
- Optimistic updates with automatic rollback
- Smooth animations with CSS transitions

## 🧠 Key React Decisions

### Component Architecture
- Separated concerns: Gallery, Feed, and Interactions are independent
- Reusable components with clear responsibilities
- Custom hooks for data fetching logic

### Real-Time Strategy
- Atomic transactions for consistency (reaction + feed event)
- Optimistic updates for immediate feedback
- Proper error handling with rollback

## 🚧 Challenges & Solutions

### Challenge 1: Real-Time Sync Across Multiple Users
**Solution**: Used InstantDB's real-time subscriptions with proper query filters and optimistic updates for immediate feedback.

### Challenge 2: Preventing UI Flicker
**Solution**: Implemented smooth transitions with CSS, optimistic updates, and proper key management in lists.

### Challenge 3: User Identity Without Authentication
**Solution**: Generated random username and color on first visit, persisted in localStorage using Zustand persist middleware.

## 🔮 Future Improvements

- Enhanced emoji picker library
- Ability to delete own reactions/comments
- User avatars with generated identicons
- Virtual scrolling for long lists
- Image search by keyword
- Unit and E2E tests
- Accessibility improvements

## 🧪 Testing

### Manual Testing
Open multiple browser tabs or devices and:
1. Add emoji reaction in one tab → verify it appears in others
2. Add comment in one tab → verify it appears in feed and image view in others
3. Test with multiple users simultaneously

### Browser Compatibility
Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📄 License

This project is created as part of an internship assignment.

## 👤 Author

[Your Name]
- GitHub: [@yourusername]
- Email: your.email@example.com

---

**Note**: This is an assignment project demonstrating real-time web application development with React and InstantDB.
