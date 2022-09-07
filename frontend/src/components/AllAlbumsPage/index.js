import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { getAlbums } from '../../store/album';
import './AllAlbumsPage.css';

const AlbumsPage = () => {

const  albums = Object.values(useSelector(state => state.album));
const dispatch = useDispatch();
const history = useHistory();

useEffect(() => {
  dispatch (getAlbums());
}, [dispatch]);

if (!albums) {
  return null;
}


const goToDetails = (albumId) => {
  console.log('albumId', albumId);
  history.push(`/albums/${albumId}`);
}

  return (
      <div className="album-detail">
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