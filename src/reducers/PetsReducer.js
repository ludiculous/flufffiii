
import {FETCH_PETSLIST} from '../actions/types'
const INITIAL_STATE = {pets:''};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCH_PETSLIST:
    return {...state, pets:action.payload};
    default:
      return state
  }
}
