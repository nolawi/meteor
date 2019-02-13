import { combineReducers } from 'redux';
import { WORLD_MAP_STATE_KEY, worldMapReducer } from 'components/WorldMap';
import { POPOVER_STATE_KEY, popoverReducer } from 'components/Popover';

const rootReducer = combineReducers({
    [`${WORLD_MAP_STATE_KEY}`]: worldMapReducer,
    [`${POPOVER_STATE_KEY}`]: popoverReducer
});

export default rootReducer;