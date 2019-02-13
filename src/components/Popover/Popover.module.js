import { mergeMap, map, catchError } from 'rxjs/operators';
import { feature } from "topojson-client"
import worldData from 'dataAssets/countriesData'
import { API_ENPOINTS, HTTP_STATUS } from "consts";

export const POPOVER_STATE_KEY = "POPOVER";

const INITIAL_STATE = { };

// Actions
const SHOW_POPOVER = `${POPOVER_STATE_KEY}.SHOW_POPOVER`;
export const showPopover = content => ({
    type: SHOW_POPOVER,
    payload: {
        content
    }
})

const HIDE_POPOVER = `${POPOVER_STATE_KEY}.HIDE_POPOVER`;
export const hidePopover = () => ({
    type: HIDE_POPOVER
})



// Reducer
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_POPOVER:
            return {
                ...action.payload
            }
        case HIDE_POPOVER:
            return {
                ...INITIAL_STATE
            };
        default:
            return state;
    }
}
