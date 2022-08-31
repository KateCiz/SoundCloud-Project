import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'; 
import './Navigation.css';

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const [isMenuShown, setIsMenuShown] = useState(false);
    
    const showMenu = () => {
        if(isMenuShown) return;
        setIsMenuShown(true);
    };

    useEffect(() => {
        //this makes sure the click event listener is only activated 
        //if the menu is open 
        if(!isMenuShown) return;

        const hideMenu = () => {
            setIsMenuShown(false);
        };

        //while the menu is open there is an event listener 
        //listening to see if the user clicks away from the menu 
        //if so the menu should close
        document.addEventListener('click', hideMenu);

        //clean up function
        return () => document.removeEventListener('click', hideMenu);
    }, [isMenuShown]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.removeSessionUser());
    };

    return (
        <>
            <button className='nav-item' onClick={showMenu}>
                <i className="fa-solid fa-user"></i>
            </button>
            {isMenuShown && (
                <ul>
                    <li>{user.firstName}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ProfileButton;