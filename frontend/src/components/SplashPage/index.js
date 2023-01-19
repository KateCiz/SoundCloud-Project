import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SplashPage.css';
import { getSongs } from '../../store/song';
import AddAlbumModal from '../AddAlbumModal';


function SplashPage(){
    const loggedInUser = useSelector(state => state.session.user);
    const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
    const dispatch = useDispatch();

    let content;

    useEffect(() => {
        dispatch(getSongs());
    });

    let otherInfo = (
          <AddAlbumModal 
            hideForm={() => setShowCreateAlbumForm(false)} 
          />
        );


    if(!loggedInUser || loggedInUser?.id === undefined) {
        content = (
            <div className='splash-content'>
                <div id="top-splash-image-div">
                    <p className='guest-splash-photo-text1'>Discover</p>
                    <p className='guest-splash-photo-text2'>More</p>
                </div>
                {/* <div id='splash-buttons'> */}
                    {/* <input className='splash-buttons-content' type='search'></input>
                    <button className='splash-buttons-content'>Search</button> */}
                    {/* <p className='splash-buttons-content'> OR </p> */}
                    {/* <button className='splash-buttons-content' onClick={() => notLoggedIn()}>Upload Your Own</button> */}
                {/* </div> */}
                <div id='splash-call-to-action'>
                    <p id="call-to-action-text">Come On! What are you waiting for? Sign up to upload your music today!</p>
                </div>
            </div> 
        );
    } else if(loggedInUser?.id && loggedInUser?.id !== undefined) {
        content = (
            <div className='splash-content'>
                <div id="top-logged-in-splash-image-div"> 
                    <p className='loggedin-splash-photo-text1'>Listen to the beat</p>
                </div>
                <div id='splash-buttons'>
                    {/* <input className='splash-buttons-content' type='search'></input> */}
                    {/* <button className='splash-buttons-content'>Search</button>
                    <p className='splash-buttons-content'> OR </p> */}
                    {<button className='splash-buttons-content' onClick={() => setShowCreateAlbumForm(true)}>Create An Album</button>}
                </div>
                {showCreateAlbumForm && otherInfo}
            </div>
        )
    }

    return (
        content
    );
}

export default SplashPage;