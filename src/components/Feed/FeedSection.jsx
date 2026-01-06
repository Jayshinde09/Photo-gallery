import { db } from '../../lib/instantdb';

export default function FeedSection() {
  const { data, isLoading, error } = db.useQuery({
    feed_events: {}
  });

  console.log('Feed data:', { data, isLoading, error });

  const events = data?.feed_events || [];
  const sortedEvents = [...events].sort((a, b) => b.createdAt - a.createdAt).slice(0, 50);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border-2 border-purple-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-3xl">📡</span>
            Live Feed
          </h2>
          <div className="px-3 py-1 bg-gradient-to-r from-gray-300 to-gray-400 text-white text-xs font-bold rounded-full animate-pulse">
            Loading...
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton rounded-xl h-20" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Live Feed</h2>
        <p className="text-red-500 text-sm">Error loading feed: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl shadow-2xl p-5 md:p-6 lg:p-8 sticky top-24 md:top-28 lg:top-32 border border-white/50 scale-in">
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-black gradient-text flex items-center gap-3">
          <span className="text-3xl md:text-4xl animate-pulse">📡</span>
          <span className="hidden sm:inline">Live Feed</span>
          <span className="sm:hidden">Feed</span>
        </h2>
        <div className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white text-xs md:text-sm font-black rounded-full animate-pulse shadow-lg">
          {sortedEvents.length} LIVE
        </div>
      </div>
      <div className="space-y-4 md:space-y-5 max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-sm mb-2">🎭 No activity yet</p>
            <p className="text-gray-400 text-xs">Be the first to interact!</p>
          </div>
        ) : (
          sortedEvents.map((event, index) => (
            <div 
              key={event.id} 
              className="group bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 p-4 rounded-2xl border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white flex-shrink-0">
                  {event.username?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800 text-sm">{event.username}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{new Date(event.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {event.type === 'reaction' ? (
                      <span>
                        <span className="text-purple-600 font-semibold">reacted</span> {event.content}
                      </span>
                    ) : (
                      <span>
                        <span className="text-blue-600 font-semibold">commented:</span> "{event.content}"
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
