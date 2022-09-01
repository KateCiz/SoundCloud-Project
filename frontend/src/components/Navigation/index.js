import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import ProfileButton from './ProfileButton';
import './Navigation.css';
import GuestUserButton from './GuestUserButton';

function Navigation() {
    const loggedInUser = useSelector(state => state.session.user);
    let sessionNavLinks;

    if(!loggedInUser){
        sessionNavLinks = (
            <>
                <NavLink className='nav-text nav-item' to='/signup'>Sign Up</NavLink>
                <NavLink  className='nav-text nav-item' to='/login'>Login</NavLink>
                <GuestUserButton />
            </>
        )
    }
    else(
        sessionNavLinks = (
             <>
                 <ProfileButton user={loggedInUser} />
                 {console.log(loggedInUser)}
             </>
         )
    )
    return (
    <nav id='navigation-bar'>
        <ul id='all-nav-items'>
            <NavLink className='nav-text nav-item' to='/'>Home</NavLink>
            {sessionNavLinks}
        </ul>
    </nav>

    )
};

export default Navigation;