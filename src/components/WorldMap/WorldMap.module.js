import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { feature } from "topojson-client"
import worldData from 'dataAssets/countriesData'
import { API_ENPOINTS, HTTP_STATUS } from "consts";

export const WORLD_MAP_STATE_KEY = "WORLD_MAP";

const INITIAL_STATE = {
    countries: feature(worldData, worldData.objects.countries).features,
    meteors: [],
    fetchStatus: null
};

// Actions
const FETCH_DATA = `${WORLD_MAP_STATE_KEY}.FETCH_DATA`;
export const fetchData = () => ({
    type: FETCH_DATA,
})

const FETCH_DATA_ERROR = `${WORLD_MAP_STATE_KEY}.FETCH_DATA_ERROR`;
const setFetchError = () => ({
    type: FETCH_DATA_ERROR
})

const SET_DATA = `${WORLD_MAP_STATE_KEY}.SET_DATA`;
const setData = payload => ({
    type: SET_DATA,
    payload
})


// Reducer
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                fetchStatus: HTTP_STATUS.PENDING
            }
        case SET_DATA:
            return {
                ...state,
                // Clear all comments which location is unknown
                meteors: [...action.payload.filter(({geolocation}) => typeof geolocation !== "undefined")],
                fetchStatus: HTTP_STATUS.SUCCESS
            };
        case FETCH_DATA_ERROR:
            return {
                ...state,
                fetchStatus: HTTP_STATUS.ERROR
            };
        default:
            return state;
    }
}


// Epics
export const fetchDataEpic = action$ => action$.pipe(
    ofType(FETCH_DATA),
    mergeMap(action => ajax.getJSON(API_ENPOINTS.NASA).pipe(
        map(response => setData(response)),
        catchError(() => of(setFetchError()))
    ))
);
