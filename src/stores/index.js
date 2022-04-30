/*Import Library*/
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
/*Import Reducer*/
import globalReducer from '@/stores/global/reducer/GlobalReducer';
import errorReducer from '@/stores/global/reducer/ErrorReducer';
import login from '@/stores/Login/LoginReducer'
/*Create Store && Logger && Combine Reducer*/
const logger = createLogger();
export const rootReducer = combineReducers({
    errorReducer,
    globalReducer,
    login,
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger),
);
