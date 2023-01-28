//all actions specific to AUDIO BAR Resource


//constants
const SET_AUDIO = 'SET_AUDIO';


//ACTION CREATORS

export const setAudio = (song) => {
    return {
        type: SET_AUDIO,
        song
    };
};


const initialState = {};

//audiobbar REDUCER
export default function audiobarReducer(state = initialState, action){
    let newState = {...state}
    switch(action.type){
        case  SET_AUDIO:
            newState = {}
            newState['song'] = action.song;
            return newState
        default:
            return state;
        };
};