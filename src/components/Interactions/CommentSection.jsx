import { useState, useMemo, useRef } from 'react';
import { db } from '../../lib/instantdb';
import { useUserStore } from '../../stores/userStore';
import { addComment } from '../../utils/comments';
import './interactions.css';

export default function CommentSection({ imageId }) {
  const { userId, username, color } = useUserStore();
  const [commentText, setCommentText] = useState('');
  const [optimisticComments, setOptimisticComments] = useState([]);
  const inputRef = useRef(null);

  const { data, isLoading } = db.useQuery({
    comments: {
      $: {
        where: { imageId }
      }
    }
  });

  const comments = data?.comments || [];
  const allComments = useMemo(() => {
    return [...comments, ...optimisticComments].sort((a, b) => b.createdAt - a.createdAt);
  }, [comments, optimisticComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !userId) return;

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      text: commentText,
      userId,
      username,
      createdAt: Date.now()
    };

    setOptimisticComments(prev => [...prev, optimistic]);
    setCommentText('');
    inputRef.current?.focus();

    try {
      await addComment(imageId, commentText, userId, username);
      setOptimisticComments(prev => prev.filter(c => c.id !== tempId));
    } catch (error) {
      setOptimisticComments(prev => prev.filter(c => c.id !== tempId));
    }
  };

  if (isLoading) return <div className="comments-loading">Loading...</div>;

  return (
    <div className="comments-container">
      <div className="comments-header">
        <span className="comments-icon">💬</span>
        <span className="comments-title">Comments</span>
        <span className="comments-count">{allComments.length}</span>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          ref={inputRef}
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your thoughts..."
          className="comment-input"
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="comment-submit"
        >
          →
        </button>
      </form>

      <div className="comments-list">
        {allComments.length === 0 ? (
          <div className="no-comments">
            <span className="no-comments-icon">💭</span>
            <span className="no-comments-text">Be the first to comment</span>
          </div>
        ) : (
          allComments.map((comment) => (
            <div 
              key={comment.id} 
              className={`comment-item ${comment.id.startsWith('temp-') ? 'comment-optimistic' : ''}`}
            >
              <div 
                className="comment-avatar"
                style={{ backgroundColor: comment.userId === userId ? color : '#6366f1' }}
              >
                {comment.username?.charAt(0) || 'U'}
              </div>
              <div className="comment-content">
                <div className="comment-author">{comment.username}</div>
                <div className="comment-text">{comment.text}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
