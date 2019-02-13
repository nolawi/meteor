import 'rxjs';
import { combineEpics } from 'redux-observable';
import { fetchDataEpic } from 'components/WorldMap'

export default combineEpics(
    fetchDataEpic
);