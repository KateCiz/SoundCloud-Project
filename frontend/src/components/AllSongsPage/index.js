import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { getSongs } from '../../store/song';
import './AllSongsPage.css';

const SongsPage = () => {

const  songs = Object.values(useSelector(state => state.song));
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
                  <div onClick={() => goToDetails(song.id)}>
                    <div 
                      className='song-list-image' 
                      style={{ backgroundImage: `url('${song.previewImage}')` }}>
                    </div>
                    <div>
                      <p className='song-list-title'>{song.title}</p>
                    </div>
                  </div>
                  </li>
                  );
                })}
          </ul>
      </div>
    );





  // WORKS!!!!!
    // return (
    //     <div className="song-detail">
    //             {songs && (songs.map(song => {
    //                return(         <div>
    //                             {song?.title}
    //                         </div>
    //                );
    //             }))}
    //     </div>
    //   );
    };

    export default SongsPage;