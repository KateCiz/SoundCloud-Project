import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { getAlbums } from '../../store/album';
import CreateAlbumForm from '../CreateAlbumForm';
import './AllAlbumsPage.css';

const AlbumsPage = () => {
  
  const  albums = Object.values(useSelector(state => state.album));
  const loggedInUser = useSelector(state => state.session.user);
  const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let content;
  let otherInfo = (
    <CreateAlbumForm 
      hideForm={() => setShowCreateAlbumForm(false)} 
    />
  );


useEffect(() => {
  dispatch (getAlbums());
}, [dispatch]);

if (!albums) {
  return null;
}


if(!loggedInUser || loggedInUser?.id === undefined){
  content = (
    <p className='all-albums-header'>Log In Or Sign Up To Create An Album!</p>
  );
} else if(loggedInUser?.id && loggedInUser?.id !== undefined){
    content = ( 
    <div className='all-albums-header'>
      {<button className='splash-buttons-content' onClick={() => setShowCreateAlbumForm(true)}>Create An Album</button>}
      {showCreateAlbumForm && otherInfo}
    </div>
    );
}

const goToDetails = (albumId) => {
  console.log('albumId', albumId);
  history.push(`/albums/${albumId}`);
}

  return (
      <div className="album-detail">
        {content}
          <ul>
              {albums && albums.map(album => {
                return (
                <li key={album.id}>
                  <div 
                    className='album-list-item'
                    onClick={() => goToDetails(album.id)}>
                      <div 
                          className='album-list-image' 
                          style={{ backgroundImage: `url('${album.previewImage}')` }}>
                      </div>
                      <div>
                          <p className='album-list-title'>{album.title}</p>
                      </div>
                  </div>
                </li>
                  );
                })}
          </ul>
      </div>
    );
};

export default AlbumsPage;