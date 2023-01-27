import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createComment } from '../../store/comment';
import { getOneSong } from '../../store/song';
import { getAllCommentsForSong } from '../../store/comment';
import './index.css';

function CreateCommentForm({ hideForm }) {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const history = useHistory();

    const loggedInUser = useSelector(state => state.session.user);
    const album_id = useSelector(state => state.song[songId].Album.id);
    const [content, setContent] = useState('');

    const [contentErrors, setContentErrors] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        if (content.replaceAll(" ", "").length < 1) {
          setContentErrors(true);
        } else {
          setContentErrors(false);
        }
      }, [content]);

    if (!loggedInUser?.id) return (
        <Redirect to='/'/>
      )
  
      const handleClickAway = (e) => {
        e.preventDefault();
        hideForm();
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (contentErrors) {
            setShowErrors(true);
        }
      
        if (!contentErrors) {
            
            let comment = {
                content,
                song_id: songId,
                album_id
            };
        
            hideForm();

            return dispatch(createComment(comment))
            .then(() => {dispatch(getOneSong(songId))})
            .then(() => {dispatch(getAllCommentsForSong(songId))})
        }
    }

    return (
        <form onSubmit={handleSubmit} className='create-comment-form'>
            <p className='create-comment-header'>Create Comment</p>
            {contentErrors && showErrors ? (
                <div className="errors-msg">
                  <p>Content must have at least 1 character</p>
                </div>
                ) : null}
            <label className='create-comment-label'>
                Comment: 
                <textarea
                    // type="text"
                    className="create-comment-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} 
                    required />
            </label>
            <button className="create-comment-btn" type="submit">Post Comment</button>
            <button className="cancel-comment-btn" type="button" onClick={handleClickAway}>Cancel</button>
        </form>
    )
};

export default CreateCommentForm;
