import csrfFetchFunction from "./csrf";

const LOAD_SESSION_USER = 'session/LOAD_SESSION_USER';
const SIGN_UP_SESSION_USER = 'session/SIGN_UP_SESSION_USER';
const ADD_SESSION_USER = 'session/ADD_SESSION_USER';
const DELETE_SESSION_USER = 'session/DELETE_SESSION_USER';

const loadSessionUser = (user) => ({
    type: LOAD_SESSION_USER,
    user
});

const signUpSessionUser = (user) => ({
    type: SIGN_UP_SESSION_USER,
    user
});

const addSessionUser = (user) => ({
    type: ADD_SESSION_USER,
    user
});

const deleteSessionUser = () => ({
    type: DELETE_SESSION_USER
});

export const getSessionUser = () => async (dispatch) => {
	const response = await csrfFetchFunction('/api/session');

	if (response.ok) {
		const user = await response.json();
		dispatch(loadSessionUser(user));
	}
};

export const addNewSessionUser = (user) => async (dispatch) => {
    const response = await csrfFetchFunction('/api/signup', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if(response.ok){
        const user = await response.json();
        console.log(user);
        dispatch(signUpSessionUser(user));
    }
};

export const loginSessionUser = (email, password) => async (dispatch) => {
    const response = await csrfFetchFunction('/api/login', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    if(response.ok){
        const user = await response.json();
        console.log(user);
        dispatch(addSessionUser(user));
    }
};

export const removeSessionUser = () => async (dispatch) => {
	const response = await csrfFetchFunction('/api/logout', {
        method: 'DELETE'
    });
		dispatch(deleteSessionUser());
        return response;
	};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type){
        case LOAD_SESSION_USER: 
            newState.user = action.user;
            return newState;
        case SIGN_UP_SESSION_USER:
            newState.user = action.user;
            return newState;
        case ADD_SESSION_USER:
            newState.user = action.user;
            return newState;
        case DELETE_SESSION_USER:
            newState.user = null;
            return newState;
        default: 
            return newState;
    }
};

export default sessionReducer;