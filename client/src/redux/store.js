import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import postReducer from './post/postSlice';
import themeReducer from './theme/themeSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

// Combine the 'user','post' and 'theme' reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer, // Assign user slice to 'user' key in the Redux state
  post: postReducer,
  theme: themeReducer // Assign theme slice to 'theme' key in the Redux state
});

// Configuration for Redux Persist
const persisteConfig = {
  key: 'root', // key for storing persisted data in localStorage
  storage,
  version: 1
}

// Apply persistence to rootReducer using persistReducer
const persistedReducer = persistReducer(persisteConfig, rootReducer);

// Create the Redux store with the persisted reducer and default middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false}),
});

// Create and export a persistor for the store, allowing the state to be rehydrated from storage
export const persistor = persistStore(store)