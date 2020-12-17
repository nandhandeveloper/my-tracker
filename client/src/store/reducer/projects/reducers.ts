import {
    SPINNER_IN_PROJECT,
    ADD_NEW_PROJECT,
    ON_PROJECT_SELECTED,
    ON_PROJECT_ACTIONS_MODAL_TOGGLE,
} from './../../actions/projects/actionTypes';
import { Project } from './../../../models/Project';
import { GET_ALL_PROJECTS, ProjectsActionTypes } from '../../actions/projects/actionTypes';

interface ProjectStates {
    projects: Project[] | undefined;
    selectedProject: Project | undefined;
    isError: boolean;
    isLoading: boolean;
    isActionsModalOpen: boolean;
}

const initialState: ProjectStates = {
    projects: undefined,
    selectedProject: undefined,
    isError: false,
    isLoading: false,
    isActionsModalOpen: false,
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

const onProjectSelected = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        selectedProject: data,
    };
};

const onActionsModalToggle = (state: ProjectStates): ProjectStates => {
    const { isActionsModalOpen } = state;
    return {
        ...state,
        isActionsModalOpen: !isActionsModalOpen,
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
        case ON_PROJECT_SELECTED:
            return onProjectSelected(state, action);
        case ON_PROJECT_ACTIONS_MODAL_TOGGLE:
            return onActionsModalToggle(state);
        default:
            return state;
    }
};

export default reducer;
