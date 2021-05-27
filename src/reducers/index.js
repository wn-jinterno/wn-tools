import { combineReducers } from "redux";
import globalReducer from './global'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const globalPersistConfig = {
    key: 'global',
    storage: storage,
    whitelist: [], // specify which ones to persist offline
  }

export default combineReducers({ 
    global: persistReducer(globalPersistConfig, globalReducer)
});