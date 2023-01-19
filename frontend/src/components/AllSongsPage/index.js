import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { getSongs } from '../../store/song';
import './AllSongsPage.css';

const SongsPage = () => {

const songs = Object.values(useSelector(state => state.song));
const dispatch = useDispatch();
const history = useHistory();

useEffect(() => {
  dispatch (getSongs());
}, [dispatch]);


if (!songs) {
  return null;
}

const goToDetails = (songId) => {
  console.log('songId', songId);
  history.push(`/songs/${songId}`);
}


  return (
      <div className="song-detail">
          <ul>
              {songs && songs.map(song => {
                return (
                  <li key={song.id}>
                  <div 
                    className='song-list-item'
                    onClick={() => goToDetails(song.id)}>
                    <div 
                      className='song-list-image' 
                      style={{ backgroundImage: `url('${song.previewImage}')` }}>
                    </div>
                    <div className='song-list-title-audio'>
                      <div>
                        <div className='song-list-title'>{song.title}</div>
                      </div>
                      <audio
                        className='song-list-play'
                        controls
                        src={song.url}>{song.url}
                      </audio>
                    </div>
                  </div>
                  </li>
                  );
                })}
          </ul>
      </div>
    );
}

export default SongsPage;