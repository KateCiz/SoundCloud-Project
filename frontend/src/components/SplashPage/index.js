import './SplashPage.css'
;
function SplashPage(){
    return (
    <div className='splash-content'>
        <div id="top-splash-image-div">
            {/* <img id="top-splash-image" alt='girl-listening-to-music' src='https://res.cloudinary.com/dymmlu1dw/image/upload/v1661817134/soundcloud/pexels-andrea-piacquadio-813940_orqq1x.jpg'/> */}
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
    )
}

export default SplashPage;