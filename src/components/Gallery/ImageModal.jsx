import { useEffect } from 'react';
import { useModalStore } from '../../stores/modalStore';
import EmojiReactions from '../Interactions/EmojiReactions';
import CommentSection from '../Interactions/CommentSection';

export default function ImageModal() {
  const { isOpen, selectedImage, closeModal } = useModalStore();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeModal]);

  if (!isOpen || !selectedImage) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="modal-close">
          ✕
        </button>
        
        <div className="modal-card">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="modal-image-container">
              <img
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description || 'Unsplash image'}
                className="modal-image"
                onLoad={(e) => {
                  e.target.style.opacity = '1';
                }}
                onLoadStart={(e) => {
                  e.target.style.opacity = '0';
                }}
              />
            </div>
            
            <div className="modal-info">
              <h2 className="modal-author">
                {selectedImage.user.name}
              </h2>
              {selectedImage.description && (
                <p className="modal-description">{selectedImage.description}</p>
              )}
            </div>
          </div>
          
          <div className="modal-interactions">
            <EmojiReactions imageId={selectedImage.id} />
            <CommentSection imageId={selectedImage.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
