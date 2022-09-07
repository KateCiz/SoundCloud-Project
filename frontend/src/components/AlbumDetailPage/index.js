import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditAlbumForm from '../EditAlbumForm';
import CreateSongForm from '../CreateSongForm';
import { getAlbums, getOneAlbum, removeAlbum } from '../../store/album';

const AlbumDetailPage = () => {
  const dispatch= useDispatch();
  const history = useHistory();
  
  const { albumId } = useParams();
  const album = useSelector(state => state.album[albumId]); //is this line necessary???
  const  albums = Object.values(useSelector(state => state.album));
  const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
  const [showCreateSongForm, setShowCreateSongForm] = useState(false);
  const loggedInUser = useSelector(state => state.session.user);
  let editForm;
  let createForm;

  useEffect(() => {
    setShowEditAlbumForm(false);
	  dispatch (getOneAlbum(albumId));
  }, [albumId, dispatch]);


  if (!album) {
    return null;
  }
console.log("album songs", album.Songs);

if (showEditAlbumForm && album.userId === loggedInUser?.id){
    editForm = (
      <EditAlbumForm 
        album={album} 
        hideForm={() => setShowEditAlbumForm(false)} 
      />
    );
};

if(showCreateSongForm && album.userId === loggedInUser?.id){
    createForm = (
      <CreateSongForm 
        album={album}
        hideForm={() => setShowCreateSongForm(false)} 
      />
  );
}

const deleteAlbum = (albumId) => {
  dispatch(removeAlbum(albumId))
  history.push('/albums')
};

    return (
        <div className="album-detail">
          <div className={`album-detail-image-background`}>
            <div
              className="album-detail-image"
              style={{ backgroundImage: `url('${album.previewImage}')` }}
            >
                <ul>
                    <li key={`${album.id}${album.title}`}>{`Title: ${album.title}`}</li>
                    <li key={`${album.id}${album?.Artist?.username}`}>{`Artist: ${album?.Artist?.username}`}</li>
                    <li key={`${album.id}${album.description}`}>{`Description: ${album.description}`}</li>
                  {album?.Songs?.map((song, idx) => {
                    return (
                      <li key={`${album.id}${song.id}`}>{`Song #${idx + 1}: ${song.title}`}</li>
                    )
                  })}
                </ul>
            </div>
            <div>
              {(!showEditAlbumForm && album.userId === loggedInUser?.id) && (
                <button onClick={() => setShowEditAlbumForm(true)}>Edit</button>
              )}
              {(album.userId === loggedInUser?.id) && (
                <button onClick={() => (deleteAlbum(albumId))}>Delete</button>
              )}
            </div>
            <div>
            {(!showCreateSongForm && album.userId === loggedInUser?.id) && (
                <button onClick={() => setShowCreateSongForm(true)}>Add Song</button>
              )}
            </div>
    
          </div>
          <div>
          {editForm}
          </div>
          <div>
          {createForm}
          </div>
        </div>
      );
    };

    export default AlbumDetailPage;