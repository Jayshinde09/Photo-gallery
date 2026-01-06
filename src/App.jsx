import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from './stores/userStore';
import ImageGrid from './components/Gallery/ImageGrid';
import ImageModal from './components/Gallery/ImageModal';
import FeedSection from './components/Feed/FeedSection';
import { useGalleryStore } from './stores/galleryStore';
import './styles/main.css';

const queryClient = new QueryClient();

function AppContent() {
  const { userId, username, initUser } = useUserStore();
  const { page, setPage } = useGalleryStore();

  useEffect(() => {
    initUser();
  }, []);

  if (!userId) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loading-spinner">
            <div className="spinner-ring outer"></div>
            <div className="spinner-ring inner"></div>
          </div>
          <h2 className="loading-title">Initializing Gallery</h2>
          <p className="loading-text">Setting up your experience...</p>
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-icon">
              <span>📸</span>
            </div>
            <div>
              <h1 className="brand-title">Photo Gallery</h1>
              <p className="brand-subtitle hidden sm:inline">Discover & Share Amazing Moments ✨</p>
            </div>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              {username?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="user-name">{username}</p>
              <p className="user-status">Active now</p>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="platform-info">
          <div className="info-card">
            <h2 className="info-title">Stunning Photography Collection</h2>
            <p className="info-description">
              Explore breathtaking images from talented photographers worldwide. React with emojis, 
              share your thoughts through comments, and watch as others interact in real-time. 
              Every click reveals a new story, every image sparks conversation.
            </p>
            <div className="info-features">
              <div className="feature-item">
                <span className="feature-icon">🌍</span>
                <span className="feature-text">Global Photos</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💖</span>
                <span className="feature-text">Express Yourself</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔥</span>
                <span className="feature-text">Live Interactions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="gallery-section">
            <ImageGrid page={page} />
            <div className="pagination">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="pagination-btn"
              >
                <span>←</span>
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="pagination-current">
                Page {page}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                className="pagination-btn"
              >
                <span className="hidden sm:inline">Next</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <div>
            <FeedSection />
          </div>
        </div>
      </main>

      <ImageModal />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;