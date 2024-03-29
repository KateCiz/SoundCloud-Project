import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import albumReducer from "./album";
import sessionReducer from "./session";
import songReducer from "./song";
import commentsReducer from "./comment";
import audiobarReducer from "./audiobar";

const rootReducer = combineReducers({
  session : sessionReducer,
  song : songReducer,
  album: albumReducer,
  comment: commentsReducer,
  audiobar: audiobarReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
