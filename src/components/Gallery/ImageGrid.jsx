import { useUnsplashImages } from '../../hooks/useUnsplashImages';
import ImageCard from './ImageCard';

export default function ImageGrid({ page }) {
  const { data: images, isLoading, error } = useUnsplashImages(page);

  if (isLoading) {
    return (
      <div className="image-grid">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="skeleton" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="skeleton-spinner"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">Error: {error.message}</p>
        <button onClick={() => window.location.reload()} className="error-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images?.map((image, index) => (
        <div key={image.id} style={{ animationDelay: `${index * 0.05}s` }}>
          <ImageCard image={image} />
        </div>
      ))}
    </div>
  );
}
