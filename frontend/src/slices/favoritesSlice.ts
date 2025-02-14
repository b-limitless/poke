import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Pokémon type (you can adjust this based on your structure)
export interface IPokemon {
  pokemonId: number;
  name: string;
  imageUrl: string;
  // Add other properties of Pokémon here
}

// Define initial state
export interface FavoritesState {
  favorites: IPokemon[];
}

const initialState: FavoritesState = {
  favorites: [],
};

// Create slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Add favorite Pokémon
    addFavorite: (state, action: PayloadAction<IPokemon>) => {
      state.favorites.push(action.payload);
    },

    // Remove favorite Pokémon by id
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.pokemonId !== action.payload
      );
    },

    // Set favorites list (useful for initial loading from the backend)
    setFavorites: (state, action: PayloadAction<IPokemon[]>) => {
      state.favorites = action.payload;
    },

    toggleFavorite: (state, action: PayloadAction<IPokemon>) => {
      const pokemon = action.payload;
      const existingFavoriteIndex = state.favorites.findIndex(
        (fav) => fav.pokemonId === pokemon.pokemonId
      );

      if (existingFavoriteIndex === -1) {
        // If it doesn't exist in favorites, add it
        state.favorites.push(pokemon);
      } else {
        // If it exists in favorites, remove it
        state.favorites = state.favorites.filter(
          (fav) => fav.pokemonId !== pokemon.pokemonId
        );
      }
    },
  },
});

// Export actions
export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

// Export the reducer to be used in the store
export default favoritesSlice.reducer;