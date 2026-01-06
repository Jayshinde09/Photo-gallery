import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from './stores/userStore';
import ImageGrid from './components/Gallery/ImageGrid';
import ImageModal from './components/Gallery/ImageModal';
import FeedSection from './components/Feed/FeedSection';
import { useGalleryStore } from './stores/galleryStore';

const queryClient = new QueryClient();

function AppContent() {
  const { userId, username, initUser } = useUserStore();
  const { page, setPage } = useGalleryStore();

  useEffect(() => {
    initUser();
  }, []);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-8 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-8 border-blue-200 rounded-full"></div>
            <div className="absolute inset-3 border-8 border-t-transparent border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Initializing Gallery
          </h2>
          <p className="text-gray-600">Setting up your experience...</p>
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-xl">
        <div className="max-w-[1920px] mx-auto px-16 py-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span className="text-white text-3xl">📸</span>
            </div>
            <div>
              <h1 className="text-4xl font-black gradient-text">Photo Gallery</h1>
              <p className="text-sm text-gray-500 font-medium">Real-time collaboration</p>
            </div>
          </div>
          <div className="flex items-center gap-4 glass px-6 py-3 rounded-full border border-purple-200 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md ring-4 ring-white/50">
              {username?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-base">{username}</p>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1920px] mx-auto px-16 py-16 w-full">
        {/* Platform Info Section */}
        <div className="mb-16 text-center">
          <div className="glass rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-3xl font-bold gradient-text mb-4">Real-Time Photo Gallery</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience seamless collaboration with instant emoji reactions and live comments. 
              Connect with others in real-time as you explore beautiful photography from around the world.
            </p>
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2 text-purple-600">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Real-time Sync</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-2xl">😊</span>
                <span className="font-semibold">Emoji Reactions</span>
              </div>
              <div className="flex items-center gap-2 text-pink-600">
                <span className="text-2xl">💬</span>
                <span className="font-semibold">Live Comments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <ImageGrid page={page} />
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="group px-8 py-4 glass rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 border border-white/50"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <span className="font-bold text-gray-700 text-base">Previous</span>
              </button>
              <div className="px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-black rounded-2xl shadow-xl text-lg">
                Page {page}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                className="group px-8 py-4 glass rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 border border-white/50"
              >
                <span className="font-bold text-gray-700 text-base">Next</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
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
