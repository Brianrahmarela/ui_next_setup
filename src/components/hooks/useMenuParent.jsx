import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useMenuParent = create(
  persist(
    (set, get) => ({
      menuParent: [],
      addMenuParent: (menu) => set((state) => ({ menuParent: menu })),
    }),
    {
      name: 'submenu', 
      storage: createJSONStorage(() => localStorage), 
    },
  ),
)

export { useMenuParent };

