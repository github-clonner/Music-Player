import { combineReducers } from 'redux';
import PlayerReducer from './PlayerReducer';
import NavReducer from './NavReducer';

export default combineReducers({
    nav: NavReducer,
    player: PlayerReducer
});