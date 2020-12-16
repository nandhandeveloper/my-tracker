import { combineReducers } from 'redux';
import CommonReducer from './reducer/common/reducers';
import ProjectsReducer from './reducer/projects/reducers';

export const rootReducer = combineReducers({
    commonRed: CommonReducer,
    projectsRed: ProjectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
