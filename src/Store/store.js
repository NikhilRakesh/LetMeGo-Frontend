import { createStore, combineReducers } from 'redux';
import authReducer from '../Reducers/authReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { configureStore } from '@reduxjs/toolkit';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
});

const store = configureStore({
    reducer: rootReducer
});

export const persistor = persistStore(store);
export default store;