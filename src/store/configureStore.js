import {createStore, applyMiddleware} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './'

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(rootEpic);

    return store;
}