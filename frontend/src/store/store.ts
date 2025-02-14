import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from 'slices/favoritesSlice'; // Import your favorites slice

const store = configureStore({
  reducer: {
    favorites: favoritesReducer, // Adding the favorites slice to the store
  },
});

export type AppDispatch = typeof store.dispatch; // Type for dispatch
export type RootState = ReturnType<typeof store.getState>; // Type for the root state

export default store;