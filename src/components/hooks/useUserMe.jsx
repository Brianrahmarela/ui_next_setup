import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserMe = create(
  persist(
    (set, get) => ({
      userMe: [],
      addUserMe: (dataUser) => set((state) => ({ userMe: dataUser })),
    }),
    {
      name: 'user', 
      storage: createJSONStorage(() => localStorage), 
    },
  ),
)

export { useUserMe };

