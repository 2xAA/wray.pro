import { createStore as reduxCreateStore } from "redux";

const reducer = (state, action) => {
  if (action.type === `UPDATE_ARTIST`) {
    return Object.assign({}, state, {
      artist: action.payload,
    });
  }

  if (action.type === `UPDATE_TRACK`) {
    return Object.assign({}, state, {
      track: action.payload,
    });
  }

  if (action.type === `UPDATE_NOWPLPAYING`) {
    return Object.assign({}, state, {
      nowPlaying: action.payload,
    });
  }

  return state;
};

const initialState = { artist: "", track: "", nowPlaying: false };

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
