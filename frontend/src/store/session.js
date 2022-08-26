import csrfFetchFunction from "./csrf";

const ADD_SESSION_USER = 'session/ADD_SESSION_USER';
const DELETE_SESSION_USER = 'session/DELETE_SESSION_USER';

const addSessionUser = (user) => ({
    type: ADD_SESSION_USER,
    user
});

const deleteSessionUser = () => ({
    type: DELETE_SESSION_USER
});

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
}

console.log(wow);

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type){
        case ADD_SESSION_USER:
            console.log(action.user);
            newState.user = action.user;
            return newState
        case DELETE_SESSION_USER:
            newState.user = null;
            return newState
        default: 
            return newState;
    }
};

export default sessionReducer;