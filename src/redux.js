/// Creating an store
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';

export const userConstants = {

    USERNAME: 'USERNAME',
    SET_USERNAME: 'SET_USERNAME',
    GISTS: 'GISTS',
    SET_GISTS: 'SET_GISTS',
    ERROR: 'ERROR',
    SET_ERROR: 'SET_ERROR'

};

export const userActions = {
    setUsername: (username) => (dispatch) => {
        dispatch({ type: userConstants.SET_USERNAME, username });
    },
    setGists: (gists) => (dispatch) => {
        dispatch({ type: userConstants.SET_GISTS, gists });
    },
    setError: (error) => (dispatch) => {
        dispatch({ type: userConstants.SET_ERROR, error });
    }
};

const initialState = { username: '', gists: [], error: null }

export function states(state = initialState, action) {
    switch (action.type) {
        case userConstants.SET_USERNAME:
            return {
                ...state,
                username: action.username,
            };
        case userConstants.SET_GISTS:
            return {
                ...state,
                error: (action.gists && action.gists.length) ? null : "Results not found",
                gists: action.gists,
            };
        case userConstants.SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state
    }
}


const rootReducer = combineReducers({
    states
});

const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
);