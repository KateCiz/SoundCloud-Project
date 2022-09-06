import csrfFetchFunction from "./csrf";

const LOAD_SONGS = 'songs/LOAD_SONGS';
const LOAD_ONE_SONG = 'songs/LOAD_ONE_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

export const loadSongs = (songs) => ({ 
    type: LOAD_SONGS,
    songs
});

const loadASong = (song) => ({ 
    type: LOAD_ONE_SONG,
    song
});

const createSong = (song) => ({
    type: CREATE_SONG,
    song
});

const editSong = (song) => ({
    type: EDIT_SONG,
    song
});

const deleteSong = (songId) => ({
    type: DELETE_SONG,
    songId
});

export const getSongs = () => async (dispatch) => {
	const response = await csrfFetchFunction('/api/songs');

	if (response.ok) {
		const songsObj = await response.json();
        // console.log('these songs', songs);
        const songs = songsObj.Songs;
		dispatch(loadSongs(songs));
	}
};

export const getOneSong = (songId) => async (dispatch) => {
	const response = await csrfFetchFunction(`/api/songs/${songId}`);

	if (response.ok) {
		const song = await response.json();
		dispatch(loadASong(song));
	}
};

export const createNewSong = (albumId, song) => async (dispatch) => {
    console.log('song before the fetch', song);
    const response = await csrfFetchFunction(`/api/albums/${albumId}/songs`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(song)
    });

    if(response.ok){
        const song = await response.json();
        console.log('try to add song', song);
        dispatch(createSong(song));
        return song;
    }
};

export const editCurrentSong = (songId, song) => async (dispatch) => {
    const response = await csrfFetchFunction(`/api/songs/${songId}`, {
        method: 'PUT', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(song)
    });

    if(response.ok){
        const song = await response.json();
        console.log(song);
        dispatch(editSong(song));
        return song;
    }
};

export const removeSong = (songId) => async (dispatch) => {
	const response = await csrfFetchFunction(`/api/songs/${songId}`, {
        method: 'DELETE'
    });
		dispatch(deleteSong(songId));
        return response;
	};


const initialState = {};

const songReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type){
        case LOAD_SONGS: 
            action.songs.forEach(song => {
                newState[song.id] = song;
            });
            return newState;
        case LOAD_ONE_SONG: 
            newState[action.song.id] = action.song;
            return newState;
        case CREATE_SONG:
            newState[action.song.id] = action.song;
            return newState;
        case EDIT_SONG:
            newState[action.song.id] = action.song;
            return newState;
        case DELETE_SONG:
            delete newState[action.songId];
            return newState;
        default: 
            return newState;
    }
};

export default songReducer;