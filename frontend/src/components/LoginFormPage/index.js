import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

 
    if (loggedInUser?.id) return (
        <Redirect to="/" />
      );    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]); // why is this line necessary???
        return dispatch(sessionActions.loginSessionUser(email, password))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        <form onSubmit={handleSubmit}>
             <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required />
            </label>
            <label>
                Password
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required />
            </label>
            <button type="submit">Log In</button>
        </form>
    )
};

export default LoginFormPage;
