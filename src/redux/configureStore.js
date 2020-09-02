import {createStore,applyMiddleware} from 'redux';
import { Reducer, initialState } from './reducer'
import thunk from 'redux-logger';
import logger from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}