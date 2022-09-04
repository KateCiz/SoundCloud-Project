import csrfFetchFunction from "./csrf";

const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM';
const CREATE_ALBUM = 'albums/CREATE_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';
const DELETE_ALBUM = 'albums/DELETE_ALBUM';

const loadAlbums = (albums) => ({ //look at pokemon example for help
    type: LOAD_ALBUMS,
    albums
});

const loadAnAlbum = (album) => ({ 
    type: LOAD_ONE_ALBUM,
    album
});

const createAlbum = (album) => ({
    type: CREATE_ALBUM,
    album
});

const editAlbum = (album) => ({
    type: EDIT_ALBUM,
    album
});

const deleteAlbum = (albumId) => ({
    type: DELETE_ALBUM
});

export const getAlbums = () => async (dispatch) => {
	const response = await csrfFetchFunction('/api/albums');

	if (response.ok) {
		const albumsObj = await response.json();
        const albums = albumsObj.Albums;
		dispatch(loadAlbums(albums));
	}
};

export const getOneAlbum = (albumId) => async (dispatch) => {
	const response = await csrfFetchFunction(`/api/albums/${albumId}`);

	if (response.ok) {
		const album = await response.json();
		dispatch(loadAnAlbum(album));
	}
};

export const createNewAlbum = (album) => async (dispatch) => {
    const response = await csrfFetchFunction('/api/albums', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    });

    if(response.ok){
        const album = await response.json();
        console.log(album);
        dispatch(createAlbum(album));
        return album;
    }
};

export const editCurrentAlbum = (album) => async (dispatch) => {
    const response = await csrfFetchFunction(`/api/albums/${album.id}`, { //look at pokemon example for help
        method: 'PUT', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    });

    if(response.ok){
        const album = await response.json();
        console.log(album);
        dispatch(editAlbum(album));
        return album;
    }
};

export const removeAlbum = (albumId) => async (dispatch) => {
	const response = await csrfFetchFunction(`/api/albums/${albumId}`, {
        method: 'DELETE'
    });
		dispatch(deleteAlbum(albumId));
        return response;
	};


const initialState = {};

const albumReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type){
        case LOAD_ALBUMS: 
            action.albums.forEach(album => {
                newState[album.id] = album
            });
            return newState;
        case LOAD_ONE_ALBUM: 
            newState[action.album.id] = action.album;
            return newState;
        case CREATE_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case EDIT_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case DELETE_ALBUM:
            delete newState[action.albumId];
            return newState;
        default: 
            return newState;
    }
};

export default albumReducer;