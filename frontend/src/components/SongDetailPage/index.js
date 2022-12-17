import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import { getOneSong, removeSong } from '../../store/song';
import './SongDetailPage.css';

const SongDetailPage = () => {
    const dispatch= useDispatch();
    const history = useHistory();

    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]); //is this line necessary???
    const [showEditSongForm, setShowEditSongForm] = useState(false);
    // const [showCreateCommentForm, setShowCreateCommentForm] = useState(false);
    const loggedInUser = useSelector(state => state.session.user);
    let otherInfo;

    useEffect(() => {
      setShowEditSongForm(false);
      // setShowCreateCommentForm(false);
    	  dispatch (getOneSong(songId));
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
      } else {
         otherInfo = (
            // {commentList}
            <p>Comments Coming Soon</p>
         )
      }

        return (
          <div className="song-detail">
            <div className="song-detail-info">
              <div 
                className='song-detail-image'
                style={{ backgroundImage: `url('${song?.previewImage}')` }}>
              </div>
                <ul>
                    <li id='song-title'>{song.title}</li>
                    <li id='song-artist'>{song?.Artist?.username}</li>
                    <li id='song-description'>{`Description: ${song.description}`}</li>
                    <li id='song-url'>
                        <audio
                          controls
                          src={song.url}>{song.url}
                        </audio>
                    </li> 
                </ul>
            </div>
            <div className='song-detail-buttons'>
              {(!showEditSongForm && song.userId === loggedInUser?.id) && (
                <button onClick={() => setShowEditSongForm(true)}>Edit</button>
              )}
              {(song.userId === loggedInUser?.id) && (
                <button onClick={() => (deleteSong(songId))}>Delete</button>
              )}
            </div>
          {otherInfo}
        </div>
      );
    };

    export default SongDetailPage;