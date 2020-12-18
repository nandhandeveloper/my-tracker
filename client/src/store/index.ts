import { combineReducers } from 'redux';
import CommonReducer from './reducer/common/reducers';
import ProjectsReducer from './reducer/projects/reducers';
import StoriesReducer from './reducer/strories/reducers';

export const rootReducer = combineReducers({
    commonRed: CommonReducer,
    projectsRed: ProjectsReducer,
    storiesRed: StoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
