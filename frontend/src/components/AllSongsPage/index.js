import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom';
import { getSongs } from '../../store/song';

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
          <div>
              <NavLink to='/songs/create'>Upload Your Own</NavLink> {/*need a route in App.js that takes you to the CreateSongForm*/}
          </div>
          <ul>
              {songs && songs.map(song => {
                return (
                  <div onClick={() => goToDetails(song.id)}>
                      <div 
                          className='song-list-image' 
                          style={{ backgroundImage: `url('${song.imageUrl}')` }}>
                          <div>
                              <p className='song-list-title'>{song.title}</p>
                          </div>
                      </div>
                  </div>
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