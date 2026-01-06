import { useModalStore } from '../../stores/modalStore';
import { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { addReaction } from '../../utils/reactions';
import { db } from '../../lib/instantdb';

const QUICK_EMOJIS = ['❤️', '👍', '😍', '🔥'];

export default function ImageCard({ image }) {
  const { openModal } = useModalStore();
  const { userId, username } = useUserStore();
  const [showReactions, setShowReactions] = useState(false);

  const { data } = db.useQuery({
    reactions: {
      $: {
        where: { imageId: image.id }
      }
    }
  });

  const reactions = data?.reactions || [];
  const reactionCounts = reactions.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {});

  const handleClick = () => {
    openModal(image);
  };

  const handleReaction = async (emoji, e) => {
    e.stopPropagation();
    if (!userId) return;
    try {
      await addReaction(image.id, emoji, userId, username);
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="image-card"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className="image-card img"
        loading="lazy"
        onLoad={(e) => {
          e.target.style.opacity = '1';
        }}
        style={{ opacity: '0', transition: 'opacity 0.3s ease-in-out' }}
      />
      
      <div className="image-overlay">
        <div className="image-info">
          <p className="image-author">{image.user.name}</p>
          {/* Quick Reactions at bottom */}
          {showReactions && (
            <div className="bottom-reactions">
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={(e) => handleReaction(emoji, e)}
                  className="bottom-reaction-btn"
                >
                  <span className="bottom-emoji">{emoji}</span>
                  {reactionCounts[emoji] && (
                    <span className="bottom-count">{reactionCounts[emoji]}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="image-hint">
        Click to interact
      </div>
    </div>
  );
}
