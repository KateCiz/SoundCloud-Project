import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongForm from '../EditSongForm';
import { getOneSong, removeSong } from '../../store/song';

const SongDetailPage = () => {
    const dispatch= useDispatch();
    const history = useHistory();

    const { songId } = useParams();
    const song = useSelector(state => state.song[songId]); //is this line necessary???
    const [showEditSongForm, setShowEditSongForm] = useState(false);
    const loggedInUser = useSelector(state => state.session.user);
    let otherInfo;

    useEffect(() => {
      setShowEditSongForm(false);
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
          <EditSongForm 
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
              <div className={`song-detail-image-background`}>
            <div
              className="song-detail-image"
              style={{ backgroundImage: `url('${song.previewImage}')` }}
            >
                <ul>
                    <li>{song.title}</li>
                    {console.log('detail song', song)}
                    <li>{song?.Artist?.username}</li>
                    <li>{song.description}</li>
                    <li>{song.url}</li> 
                </ul>
            </div>
            <div>
              {(!showEditSongForm && song.userId === loggedInUser?.id) && (
                <button onClick={() => setShowEditSongForm(true)}>Edit</button>
              )}
              {(song.userId === loggedInUser?.id) && (
                <button onClick={() => (deleteSong(songId))}>Delete</button>
              )}
            </div>
    
          </div>
          {otherInfo}
        </div>
      );
    };

    export default SongDetailPage;