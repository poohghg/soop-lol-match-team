import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface FavoriteStoreState {
  favoritePlayerIds: Set<string>;
  getFavoritePlayerIds: () => string[];
  addFavorite: (playerId: string) => void;
  removeFavorite: (playerId: string) => void;
  toggleFavorite: (playerId: string) => boolean;
  isFavorite: (playerId: string) => boolean;
}

const FAVORITE_STORAGE_KEY = 'favorite-ids';

export const useFavoritePlayerStore = create<FavoriteStoreState>()(
  persist(
    (set, get) => ({
      favoritePlayerIds: new Set<string>(),

      getFavoritePlayerIds: () => {
        return Array.from(get().favoritePlayerIds);
      },

      addFavorite: playerId => {
        set(state => {
          const newSet = new Set(state.favoritePlayerIds);
          newSet.add(playerId);
          return { favoritePlayerIds: newSet };
        });
      },

      removeFavorite: playerId => {
        set(state => {
          const newSet = new Set(state.favoritePlayerIds);
          newSet.delete(playerId);
          return { favoritePlayerIds: newSet };
        });
      },

      toggleFavorite: playerId => {
        const isCurrentlyFavorite = get().isFavorite(playerId);
        if (isCurrentlyFavorite) {
          get().removeFavorite(playerId);
          return false;
        } else {
          get().addFavorite(playerId);
          return true;
        }
      },

      isFavorite: playerId => {
        return get().favoritePlayerIds.has(playerId);
      },
    }),
    {
      name: FAVORITE_STORAGE_KEY,
      storage: createJSONStorage(() => ({
        getItem: name => localStorage.getItem(name),
        setItem: (name, value) => localStorage.setItem(name, value),
        removeItem: name => localStorage.removeItem(name),
      })),
      partialize: state => ({
        ...state,
        favoritePlayerIds: Array.from(state.favoritePlayerIds) as any,
      }),
      onRehydrateStorage: () => state => {
        if (state && Array.isArray(state.favoritePlayerIds)) {
          state.favoritePlayerIds = new Set(state.favoritePlayerIds);
        }
      },
    }
  )
);
