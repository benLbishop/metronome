import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { LoggerPredicate, createLogger } from 'redux-logger';

import { RootState } from '../reducers';
import MetronomeReducer from '../reducers/metronomeReducer';

const rootReducer = combineReducers({
    metronome: MetronomeReducer
});

const logActionFilter: LoggerPredicate = (getState: () => RootState, action: any) => {
    return true;
};

const logStateFilter = (state: RootState): Partial<RootState> => {
    return state;
};

const logger = createLogger({
    predicate: logActionFilter,
    stateTransformer: logStateFilter
});

const configureStore = () => {
    const store = createStore(
        rootReducer,
        process.env.NODE_ENV !== 'production' ? //don't apply logger middleware in production
            applyMiddleware(ReduxThunk, logger) :
            applyMiddleware(ReduxThunk)
    );
    return { store };
};

export default configureStore;