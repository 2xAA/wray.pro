import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  // if (action.type === `INCREMENT`) {
  //   return Object.assign({}, state, {
  //     count: state.count + 1,
  //   })
  // }

  if (action.type === `UPDATE_ARTIST`) {
    return Object.assign({}, state, {
      artist: action.payload,
    })
  }

  if (action.type === `UPDATE_TRACK`) {
    return Object.assign({}, state, {
      track: action.payload,
    })
  }
  return state
}

const initialState = { artist: '', track: '' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
