import CommonReducer from './reducer/common/reducers';

import {  combineReducers } from 'redux';

export const rootReducer = combineReducers({
    commonRed: CommonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
