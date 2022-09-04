import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/song';
import { Redirect, useParams } from 'react-router-dom';

function CreateSongForm({ album }) {
    const dispatch = useDispatch();
    const { albumId } = useParams();

    const loggedInUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    if (loggedInUser.id !== album.userId) return (
        <Redirect to={`/albums/${albumId}`} />
      );
  

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        let song = {
            title,
            description,
            url,
            imageUrl
        };

        return dispatch(songActions.addNewSong(song))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        }

    return (
        <form onSubmit={handleSubmit}>
             <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Title: 
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    required />
            </label>
            <label>
                Url:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} 
                    required />
            </label>
            <label>
                Image Url:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} 
                    required />
            </label>
            <button type="submit" disabled={errors.length > 0}>Create Song</button>
        </form>
    )
};

export default CreateSongForm;
