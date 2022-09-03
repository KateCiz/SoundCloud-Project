import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongForm from '../EditSongForm';
import { getOneSong, removeSong } from '../../store/song';

const SongDetailPage = () => {
    const dispatch= useDispatch();

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
              style={{ backgroundImage: `url('${song.imageUrl}')` }}
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
                <button onClick={() => dispatch(removeSong(songId))}>Delete</button>
              )}
            </div>
    
          </div>
          {otherInfo}
        </div>
      );
    };

    export default SongDetailPage;