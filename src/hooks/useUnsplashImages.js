import { useQuery } from '@tanstack/react-query';

const fetchImages = async (page = 1) => {
  const res = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=24`,
    {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    }
  );
  if (!res.ok) throw new Error('Failed to fetch images');
  return res.json();
};

export const useUnsplashImages = (page) => {
  return useQuery({
    queryKey: ['images', page],
    queryFn: () => fetchImages(page),
    staleTime: 10 * 60 * 1000
  });
};
