import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import { getOneSong, removeSong } from '../../store/song';
import { getAllCommentsForSong } from '../../store/comment';
import './SongDetailPage.css';
import SongComment from '../Comments/SongComment';
import CommentModal from '../Comments/CommentModal';

const SongDetailPage = () => {
    const dispatch= useDispatch();
    const history = useHistory();

    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]);
    const comments = Object.values(useSelector(state => state.comment));
    const loggedInUser = useSelector(state => state.session.user);
    const [showEditSongForm, setShowEditSongForm] = useState(false);
    let otherInfo;
    
    useEffect(() => {
      setShowEditSongForm(false);
      dispatch(getOneSong(songId));
      dispatch(getAllCommentsForSong(songId));
    }, [songId, dispatch]);
    

    if (!song) {
      return null;
    }

    const deleteSong = (songId) => {
      history.push('/songs')
      return (
        dispatch(removeSong(songId))
      );
    };

    if (showEditSongForm && song.userId === loggedInUser?.id) {
        otherInfo = (
          <EditSongFormModal
            song={song} 
            hideForm={() => setShowEditSongForm(false)} 
          />
        );
      }

  return (
    <div className="song-detail">
      <div className="song-detail-info">
        <div className='song-detail-text'>
          <ul className='song-detail-ul'>
              <li id='song-title'>{song.title}</li>
              <li id='song-artist'>{song?.Artist?.username}</li>
              <li id='song-description'>{`Description: ${song.description}`}</li>
          </ul>
          <div id='song-url'>
            <audio
              controls
              src={song.url}>{song.url}
            </audio>
          </div> 
        </div>
        <div 
          className='song-detail-image'
          style={{ backgroundImage: `url('${song?.previewImage}')` }}>
        </div>
      </div>
      <div className='song-details-after-top-block'>
        <div className='song-detail-buttons'>
          {(!showEditSongForm && song.userId === loggedInUser?.id) && (
            <button onClick={() => setShowEditSongForm(true)}>Edit Song</button>
          )}
          {(song.userId === loggedInUser?.id) && (
            <button onClick={() => (deleteSong(songId))} className='delete-song-btn'>Delete Song</button>
          )}
        </div>
        {otherInfo}
        <div className="song-comments-div">
          <p className="song-comments-header">Comments:</p>
          {loggedInUser && <CommentModal />}
          {comments?.map((comment, i) => {
            return (
              <SongComment key={i} comment={comment} />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SongDetailPage;