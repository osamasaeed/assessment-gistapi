/// Creating an redux store
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';

// declaration of constant actions
export const userConstants = {

    SET_GISTS: 'SET_GISTS',
    SET_ERROR: 'SET_ERROR'

};
// implementation of actions, 
export const userActions = {
    setGists: (gists) => (dispatch) => {
        if (typeof gists == "object")
        dispatch({ type: userConstants.SET_GISTS, gists });
    },
    setError: (error) => (dispatch) => {
        if (typeof error == "string")
        dispatch({ type: userConstants.SET_ERROR, error });
    }
};

// initialized initial states of props
const initialState = { gists: [], error: null }

// redux Reducer function will reactively update the nodes when nextState is changed
export function states(state = initialState, action = { type: "", ...initialState }) {
    if (typeof state == "object") {
        switch (action.type) {
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
    else return initialState
}

const rootReducer = combineReducers({
    states
});

// redux state logger for Debugging purpose
const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);