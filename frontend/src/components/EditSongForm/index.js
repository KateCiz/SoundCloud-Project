import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCurrentSong } from '../../store/song';


const EditSongForm = ({ song, hideForm }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();

    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [url, setUrl] = useState(song.url);
    const [imageUrl, setImageUrl] = useState(song.imageUrl);
    const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let songEdited = {
        title,
        description,
        url,
        imageUrl
    };
    
    let updatedSong = await dispatch(editCurrentSong(songId, songEdited))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    if (updatedSong) {
      hideForm();
    }
  };

  const handleClickAway = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-song-form">
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
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </label>
            <label>
                Url:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} 
                />
            </label>
            <label>
                Image Url:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
            </label>
        
        <button type="submit">Update Song</button>
        <button type="button" onClick={handleClickAway}>Cancel</button>
      </form>
    </section>
  );
};

export default EditSongForm;