import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewAlbum } from '../../store/album';
import { Redirect, useHistory } from 'react-router-dom';

function CreateAlbumForm({ hideForm }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedInUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    if (!loggedInUser?.id) return (
        <Redirect to='/'/>
      )
  
      const handleClickAway = (e) => {
        e.preventDefault();
        hideForm();
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        
        let album = {
            title,
            description,
            imageUrl
        };
        
        history.push(`/albums`);
        
        hideForm();

        return dispatch(createNewAlbum(album))
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
                Image Url:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} 
                    required />
            </label>
            <button type="submit" disabled={errors.length > 0}>Create Album</button>
            <button type="button" onClick={handleClickAway}>Cancel</button>
        </form>
    )
};

export default CreateAlbumForm;
