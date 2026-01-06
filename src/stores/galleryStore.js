import { create } from 'zustand';

export const useGalleryStore = create((set) => ({
  page: 1,
  setPage: (page) => set({ page })
}));
