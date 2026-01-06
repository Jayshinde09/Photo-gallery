import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  selectedImage: null,
  openModal: (image) => set({ isOpen: true, selectedImage: image }),
  closeModal: () => set({ isOpen: false, selectedImage: null })
}));
