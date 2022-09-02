import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getSongs } from '../../store/song';

const SongsPage = () => {

const dispatch= useDispatch();

  let songs = Object.values(useSelector(state => state.song));

  useEffect(() => {
	  dispatch (getSongs());
  }, [dispatch]);

  if (!songs) {
    return null;
  }

  const goToDetails = (songId) => {
    <Redirect to={`/songs/${songId}`} />
  }

    return (
        <div className="song-detail">
            <div>
                <NavLink to='/songs/create'>Upload Your Own</NavLink> {/*need a route in App.js that takes you to the CreateSongForm*/}
            </div>
            <ul>
                {console.log(songs) && songs.forEach(song => {
                    <div onClick={goToDetails(song.id)}>
                        <div 
                            className='song-list-image' 
                            style={{ backgroundImage: `url('${song.imageUrl}')` }}>
                            <div>
                                <p className='song-list-title'>{song.title}</p>
                                <p className='song-list-artist'>{song.artist.username}</p>
                            </div>
                        </div>
                    </div>
                })}
            </ul>
        </div>
      );
    };

    export default SongsPage;