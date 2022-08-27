import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.getSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/api/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;



// function App() {
//   return (
//     <h1>Hello from App</h1>
//   );
// }

// export default App;
