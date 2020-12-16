import { SPINNER_IN_PROJECT, ADD_NEW_PROJECT } from './../../actions/projects/actionTypes';
import { Project } from './../../../models/Project';
import { GET_ALL_PROJECTS, ProjectsActionTypes } from '../../actions/projects/actionTypes';

interface ProjectStates {
    projects: Project[] | undefined;
    isError: boolean;
    isLoading: boolean;
}

const initialState: ProjectStates = {
    projects: undefined,
    isError: false,
    isLoading: false,
};

const getAllProjects = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        projects: data,
    };
};

const toggleSpinner = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const {
        payload: { isLoading },
    } = action;
    return {
        ...state,
        isLoading,
    };
};

const addNewProject = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const { projects } = state;
    const {
        payload: { data },
    } = action;
    projects?.push(data);
    return {
        ...state,
        projects,
    };
};

const reducer = (state: ProjectStates = initialState, action: ProjectsActionTypes): ProjectStates => {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            return getAllProjects(state, action);
        case SPINNER_IN_PROJECT:
            return toggleSpinner(state, action);
        case ADD_NEW_PROJECT:
            return addNewProject(state, action);
        default:
            return state;
    }
};

export default reducer;
