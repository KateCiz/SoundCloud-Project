import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCurrentAlbum } from '../../store/album';

const EditAlbumForm = ({ album, hideForm }) => {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [previewImage, setPreviewImage] = useState(album.previewImage);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let albumEdited = {
        title,
        description,
        imageUrl: previewImage
    };
    
    let updatedAlbum = await dispatch(editCurrentAlbum(albumId, albumEdited))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });

    if (updatedAlbum) {
      hideForm();
    }
  };

  const handleClickAway = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-album-form">
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
                Image Url:
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)} 
                />
            </label>
        
        <button type="submit">Update Album</button>
        <button type="button" onClick={handleClickAway}>Cancel</button>
      </form>
    </section>
  );
};

export default EditAlbumForm;