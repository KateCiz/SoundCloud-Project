import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import './AboutLinks.css';

const AboutLinks = () => {
    const audiobarSong = useSelector(state => state.audiobar.song);

    return (
    <footer>
        {audiobarSong && 
        <div className='audiobar'>
            <AudioPlayer 
                className='audio-player'
                autoPlay={true}
                src={audiobarSong?.url}
                header={audiobarSong?.title}
            />
        </div>
        }
         <a 
            href="https://github.com/KateCiz/SoundCloud-Project"
            className='about-links-text'
            >GitHub</a>
    </footer>
    );
};

export default AboutLinks;