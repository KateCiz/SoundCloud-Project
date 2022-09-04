import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditAlbumForm from '../EditAlbumForm';
import { getOneAlbum, removeAlbum } from '../../store/album';

const AlbumDetailPage = () => {
    const dispatch= useDispatch();

  const { albumId } = useParams();
  const album = useSelector(state => state.album[albumId]); //is this line necessary???
  const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
  const loggedInUser = useSelector(state => state.session.user);
  let otherInfo;

  useEffect(() => {
    setShowEditAlbumForm(false);
	  dispatch (getOneAlbum(albumId));
  }, [albumId, dispatch]);

  if (!album) {
    return null;
  }
console.log("album songs", album.Songs);

if (showEditAlbumForm && album.userId === loggedInUser?.id) {
    otherInfo = (
      <EditAlbumForm 
        album={album} 
        hideForm={() => setShowEditAlbumForm(false)} 
      />
    );
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
                <button onClick={() => dispatch(removeAlbum(albumId))}>Delete</button>
              )}
            </div>
    
          </div>
          {otherInfo}
        </div>
      );
    };

    export default AlbumDetailPage;