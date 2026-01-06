import { useState, useMemo } from 'react';
import { db } from '../../lib/instantdb';
import { useUserStore } from '../../stores/userStore';
import { addReaction } from '../../utils/reactions';
import './interactions.css';

const EMOJIS = ['❤️', '👍', '😍', '🔥', '🎉', '😂'];

export default function EmojiReactions({ imageId }) {
  const { userId, username } = useUserStore();
  const [optimisticReactions, setOptimisticReactions] = useState([]);
  const [clickedEmoji, setClickedEmoji] = useState(null);

  const { data, isLoading } = db.useQuery({
    reactions: {
      $: {
        where: { imageId }
      }
    }
  });

  const reactions = data?.reactions || [];
  const allReactions = [...reactions, ...optimisticReactions];

  const handleAddReaction = async (emoji) => {
    if (!userId) return;
    
    const tempId = `temp-${Date.now()}`;
    const optimistic = { id: tempId, emoji, userId, username };
    
    setOptimisticReactions(prev => [...prev, optimistic]);
    setClickedEmoji(emoji);
    setTimeout(() => setClickedEmoji(null), 300);
    
    try {
      await addReaction(imageId, emoji, userId, username);
      setOptimisticReactions(prev => prev.filter(r => r.id !== tempId));
    } catch (error) {
      setOptimisticReactions(prev => prev.filter(r => r.id !== tempId));
    }
  };

  const reactionCounts = useMemo(() => {
    return allReactions.reduce((acc, r) => {
      acc[r.emoji] = (acc[r.emoji] || 0) + 1;
      return acc;
    }, {});
  }, [allReactions]);

  if (isLoading) return <div className="reactions-loading">Loading...</div>;

  return (
    <div className="reactions-container">
      <div className="reactions-header">
        <span className="reactions-icon">⚡</span>
        <span className="reactions-title">Quick Reactions</span>
      </div>
      
      <div className="reactions-grid">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleAddReaction(emoji)}
            className={`reaction-btn ${clickedEmoji === emoji ? 'reaction-clicked' : ''}`}
          >
            <span className="reaction-emoji">{emoji}</span>
            <span className="reaction-count">{reactionCounts[emoji] || 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
