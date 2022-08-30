import './SplashPage.css'
;
function SplashPage(){
    return (
    <>
    <div id="top-splash-image-div">
        {/* <img id="top-splash-image" alt='girl-listening-to-music' src='https://res.cloudinary.com/dymmlu1dw/image/upload/v1661817134/soundcloud/pexels-andrea-piacquadio-813940_orqq1x.jpg'/> */}
    </div>
    <div>
        <input type='search'></input>
        <button>Search</button>
        <p> OR </p>
        <button>Upload Your Own</button>
    </div>
    <div id='splash-call-to-action'>
        <p>Come On! What are you waiting for? Upload your music today!</p>
    </div>
    </>
    )
}

export default SplashPage;