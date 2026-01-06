import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const realNames = ['Jay', 'Harsh', 'Raj', 'Arjun', 'Rohan', 'Karan', 'Vikram', 'Aditya', 'Rahul', 'Amit', 'Priya', 'Sneha', 'Pooja', 'Riya', 'Kavya', 'Ananya', 'Shreya', 'Neha', 'Divya', 'Sakshi'];

export const useUserStore = create(
  persist(
    (set, get) => ({
      userId: null,
      username: null,
      color: null,
      initUser: () => {
        const state = get();
        if (state.userId) {
          console.log('User already initialized:', state);
          return;
        }
        const id = crypto.randomUUID();
        const name = realNames[Math.floor(Math.random() * realNames.length)];
        const color = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        console.log('Initializing user:', { id, name, color });
        set({ userId: id, username: name, color });
      }
    }),
    { name: 'user-storage' }
  )
);
