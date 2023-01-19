import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import ProfileButton from './ProfileButton';
import './Navigation.css';
import GuestUserButton from './GuestUserButton';

function Navigation() {
    const loggedInUser = useSelector(state => state.session.user);
    let sessionNavLinks;

    if(!loggedInUser?.id || loggedInUser?.id === undefined){
        sessionNavLinks = (
            <>
                <NavLink className='nav-text nav-item' to='/signup'>Sign Up</NavLink>
                <NavLink  className='nav-text nav-item' to='/login'>Login</NavLink>
                <GuestUserButton />
            </>
        )
    }
    else if(loggedInUser?.id)(
        sessionNavLinks = (
             <>
                 <ProfileButton user={loggedInUser} />
             </>
         )
    )
    return (
        <nav id='navigation-bar'>
            <NavLink className='nav-header' to='/'>SoundCloud Project</NavLink>
        <ul id='all-nav-items'>
            <NavLink className='nav-text nav-item' to='/songs'>Songs</NavLink>
            <NavLink className='nav-text nav-item' to='/albums'>Albums</NavLink>
            {sessionNavLinks}
        </ul>
    </nav>

    )
};

export default Navigation;