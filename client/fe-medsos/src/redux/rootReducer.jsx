import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import { persistReducer } from 'redux-persist';
import majorReducer from './reducer/majorReducer';
import postReducer from './reducer/postReducer';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const root = combineReducers({
    post: postReducer,
    major: majorReducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, root)
export default persistedReducer
