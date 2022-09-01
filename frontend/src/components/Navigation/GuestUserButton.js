import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'; 
import './Navigation.css';

function GuestUserButton() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);


    const email = 'test1@user.io';
    const password = 'password';

    const logInGuest = (e) => {
        return dispatch(sessionActions.loginSessionUser(email, password))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        <>
            <button className='nav-item' onClick={logInGuest}> {/*this is going to be changed to a fetch call to ...?*/}
                <i className="fa-regular fa-user"></i>
                <p>Guest Log In</p>
            </button>
        </>
    );
};

export default GuestUserButton;