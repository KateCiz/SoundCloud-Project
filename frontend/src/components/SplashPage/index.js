import { useSelector } from 'react-redux';
import './SplashPage.css';


function SplashPage(){
    const loggedInUser = useSelector(state => state.session.user);
    
    let content;

    if(!loggedInUser || loggedInUser?.id === undefined) {
        content = (
            <div className='splash-content'>
                <div id="top-splash-image-div">
                </div>
                <div id='splash-buttons'>
                    <input className='splash-buttons-content' type='search'></input>
                    <button className='splash-buttons-content'>Search</button>
                    <p className='splash-buttons-content'> OR </p>
                    <button className='splash-buttons-content'>Upload Your Own</button>
                </div>
                <div id='splash-call-to-action'>
                    <p id="call-to-action-text">Come On! What are you waiting for? Upload your music today!</p>
                </div>
            </div> 
        );
    } else if(loggedInUser?.id && loggedInUser?.id !== undefined) {
        content = (
            <div className='splash-content'>
                <div id="top-logged-in-splash-image-div"> 
                </div>
                <div id='splash-buttons'>
                    <input className='splash-buttons-content' type='search'></input>
                    <button className='splash-buttons-content'>Search</button>
                    <p className='splash-buttons-content'> OR </p>
                    <button className='splash-buttons-content'>Upload Your Own</button>
                </div>
            </div>
        )
    }

    return (
        content
    );
}

export default SplashPage;