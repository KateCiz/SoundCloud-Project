import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignUpFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import SongsPage from './components/AllSongsPage';
import SongDetailPage from './components/SongDetailPage';
import AlbumsPage from './components/AllAlbumsPage';
import AlbumDetailPage from './components/AlbumDetailPage';
import AboutLinks from './components/AboutLinks';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.getSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route exact path="/songs">
            <SongsPage />
          </Route>
          <Route path='/songs/:songId'>
            <SongDetailPage />
          </Route>
          <Route exact path ='/albums'>
            <AlbumsPage />
          </Route>
          <Route path='/albums/:albumId'>
            <AlbumDetailPage />
          </Route>
        </Switch>
      )}
      <AboutLinks isLoaded={isLoaded}/>
    </>
  );
}

export default App;
