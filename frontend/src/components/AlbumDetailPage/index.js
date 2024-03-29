import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditAlbumModal from '../EditAlbumModal';
import AddSongModal from '../AddSongModal.js';
import { getOneAlbum, removeAlbum } from '../../store/album';
import AlbumComment from '../Comments/AlbumComment';
import './AlbumDetailPage.css';
import { removeSong } from '../../store/song';
import { getAllCommentsForSong } from '../../store/comment';

const AlbumDetailPage = () => {
  const dispatch= useDispatch();
  const history = useHistory();
  
  const { albumId } = useParams();
  const album = useSelector(state => state.album[albumId]);
  const comments = Object.values(useSelector(state => state.comment));
  const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
  const [showCreateSongForm, setShowCreateSongForm] = useState(false);
  const loggedInUser = useSelector(state => state.session.user);
  let editForm;
  let createForm;

  useEffect(() => {
    setShowEditAlbumForm(false);
	  dispatch (getOneAlbum(albumId));
    // dispatch (getAllCommentsForAlbum(albumId));
  }, [albumId, dispatch]);

  useEffect(() => {
    setShowCreateSongForm(false);
	  dispatch (getOneAlbum(albumId));
  }, [albumId, dispatch]);


  if (!album) {
    return null;
  }
console.log("album songs", album.Songs);

if (showEditAlbumForm && album.userId === loggedInUser?.id){
  editForm = (
    <EditAlbumModal 
    album={album} 
    hideForm={() => setShowEditAlbumForm(false)} 
    />
    );
  };
  
  if(showCreateSongForm && album.userId === loggedInUser?.id){
    createForm = (
      <AddSongModal 
      album={album}
      hideForm={() => setShowCreateSongForm(false)} 
      />
      );
    }
    
  const getRidOfAlbum = (albumId) => {
    album?.Songs?.map(song => {
      return dispatch(removeSong(song.id))
    });
  return (
    dispatch(removeAlbum(albumId))
    .then(() => {
      history.push('/albums')
    })
  );
};

    return (
        <div className="album-detail-page">
            <div className="album-detail-info">
              <ul className='album-detail-ul'>
                  <li id='album-title' key={`${album.id}${album.title}`}>{album.title}</li>
                  <li id='album-artist' key={`${album.id}${album?.Artist?.username}`}>{album?.Artist?.username}</li>
                  <li id='album-songs' key={`${album.id}${album.description}`}>{`Description: ${album.description}`}</li>
                {album?.Songs?.map((song, idx) => {
                  return (
                    <li key={`${album.id}${song.id}`}>{`Song #${idx + 1}: ${song.title}`}</li>
                  )
                })}
              </ul>
              <div 
                className='album-detail-image'
                style={{ backgroundImage: `url('${album.previewImage}')` }}>
              </div>
          </div>
          <div className='album-details-after-top-block'>
            <div className='album-detail-buttons'>
              {(!showEditAlbumForm && album.userId === loggedInUser?.id) && (
                <button onClick={() => setShowEditAlbumForm(true)}>Edit Album</button>
              )}
              {(album.userId === loggedInUser?.id) && (
                <button className="delete-album-btn" onClick={() => (getRidOfAlbum(albumId))}>Delete Album</button>
              )}
            {(!showCreateSongForm && album.userId === loggedInUser?.id) && (
                <button onClick={() => setShowCreateSongForm(true)}>Add Song</button>
              )}
            </div>
            <div>
            {editForm}
            </div>
            <div>
            {createForm}
            </div>
            <div className="album-comments-div">
              <p className="album-comments-header">Comments:</p>
              {/* {loggedInUser && <CommentModal />} */}
              {album?.Songs?.map((song, i) => {
                return (
                  song?.Comments?.map(comment => {
                    return <AlbumComment key={i} comment={comment} />
                  })
                )
              })}
            </div>
          </div>
        </div>
      );
    };

    export default AlbumDetailPage;