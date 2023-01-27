//all actions specific to COMMENTS Resource

//imports
import { csrfFetchFunction } from "./csrf";

//constants
const GET_ALL_ALBUM_COMMENTS = 'GET_ALL_ALBUM_COMMENTS';
const GET_ALL_SONG_COMMENTS = 'GET_ALL_SONG_COMMENTS';
const SINGLE_COMMENT = 'GET_SINGLE_COMMENT';
const CREATE_COMMENT = 'CREATE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';


//ACTION CREATORS
const getAlbumComments = (comments) => {
    return {
        type: GET_ALL_ALBUM_COMMENTS,
        comments
    }
};

const getSongComments = (comments) => {
    return {
        type: GET_ALL_SONG_COMMENTS,
        comments
    }
};

const getSingleComment = (comment) => {
    return {
        type: SINGLE_COMMENT,
        comment
    };
};

const addComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment,
    }
};

const updateComment = (comment, parentId) => {
    return {
        type: UPDATE_COMMENT,
        comment,
        parentId
    }
};

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
};

//Thunks

    //GET ALL Song Comments for an SONG
export const getAllCommentsForSong = (songId) => async (dispatch) => {
    const res = await csrfFetchFunction(`/api/songs/${songId}/comments`);
    if(res.ok){
        const data = await res.json();
        dispatch(getSongComments(data.Comments));
    }
    return res;
};

    //GET ALL Song Comments for a ALBUM
export const getAllCommentsForAlbum = (album_id) => async (dispatch) => {
    const res = await csrfFetchFunction(`/api/albums/${album_id}/comments`);
    if(res.ok){
        const data = await res.json();
        dispatch(getAlbumComments(data.Comments));
    }
    return res;
};



    //SINGLE COMMENT
export const getComment = (commentId) => async(dispatch) => {
    const res = await csrfFetchFunction(`/api/comments/${commentId}`)

    if(res.ok){
        const comment =  await res.json();
        dispatch(getSingleComment(comment))
    };
};

    //CREATE Comment
export const createComment = (comment) => async(dispatch) =>  {
    const {content} =  comment;

    const res = await csrfFetchFunction(`/api/songs/${comment.song_id}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            body: content
        })
    });

    if(res.ok){
        const newComment = await res.json();
        dispatch(addComment(newComment));
        return res
    }
};

    //UPDATE Comment
export const editComment = (comment, commentId, parentId) => async(dispatch) =>  {
    const {content} = comment;
    const res = await csrfFetchFunction(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
          body: content
        }),
    });

    if(res.ok){
        const updatedComment = await res.json();
        dispatch(updateComment(updatedComment, parentId));
        return res
    }
};


    //DELETE Comment
export const deleteAComment = (commentId) => async (dispatch) => {
    const res = await csrfFetchFunction(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    if(res.status === 200){
        dispatch(deleteComment(commentId));
    }
    return response;
};


const initialState = {comments: {}, replies: {}};

//Comments REDUCER
export default function commentsReducer(state = initialState, action){
    let newState = {...state}
    switch(action.type){
        case  GET_ALL_ALBUM_COMMENTS:
            newState = {}
            action.comments.forEach((comment) => newState[comment.id] = comment);
            return newState
        case  GET_ALL_SONG_COMMENTS:
            newState = {}
            action.comments.forEach((comment) => newState[comment.id] = comment);
            return newState
        case SINGLE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment;
            return  newState;
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState;
        default:
            return state;
        };
};
