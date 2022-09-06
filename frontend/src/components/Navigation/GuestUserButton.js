import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'; 
import './Navigation.css';

function GuestUserButton() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);


    const email = 'guest@user.io';
    const password = 'password';
    // guest id === 5

    const logInGuest = (e) => {
        return dispatch(sessionActions.loginSessionUser(email, password))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        <>
            <button className='nav-item' onClick={logInGuest}>
                <i className="fa-regular fa-user"></i>
                <p>Guest Log In</p>
            </button>
        </>
    );
};

export default GuestUserButton;