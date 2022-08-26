import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
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
