import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import ProfileButton from './ProfileButton';

function Navigation() {
    const loggedInUser = useSelector(state => state.session.user);
    let sessionNavLinks;

    if(!loggedInUser){
        sessionNavLinks = (
            <>
                <NavLink to='/signup'>Sign Up</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </>
        )
    }
    else(
        sessionNavLinks = (
             <>
                 <ProfileButton />
                 <NavLink to='/logout'>Log Out</NavLink>
             </>
         )
    )
    return (
    <nav>
        <ul>
            <NavLink to='/'>Home</NavLink>
            {sessionNavLinks}
        </ul>
    </nav>

    )
};

export default Navigation;