import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';

function SignUpFormPage() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

 
    if (loggedInUser.id) return (
        <Redirect to="/" />
      );    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === confirmPassword){
        setErrors([]); // why is this line necessary???

        let user = {
            firstName,
            lastName,
            username,
            email,
            password
        };

        return dispatch(sessionActions.addNewSessionUser(user))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        }
        return setErrors(['Passwords do not match - please re-enter them. Thank You!'])
    }

    return (
        <form onSubmit={handleSubmit}>
             <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} 
                    required />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                    required />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required />
            </label>
            <label>
                Email:
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required />
            </label>
            <label>
                Password:
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required />
            </label>
            <label>
               Confirm Password:
                <input
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    )
};

export default SignUpFormPage;
