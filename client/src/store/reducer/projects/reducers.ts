import {
    SPINNER_IN_PROJECT,
    ADD_NEW_PROJECT,
    ON_PROJECT_SELECTED,
    ON_PROJECT_ACTIONS_MODAL_TOGGLE,
    ON_PROJECT_DELETE_CONFIRM_MODAL_TOGGLE,
    ON_DELETE_SUCCESS,
    ON_DELETE_ERROR,
    ON_DELETE_SPINNER,
    REFRESH_PROJECTS_AFTER_DELETE,
} from './../../actions/projects/actionTypes';
import { Project } from './../../../models/Project';
import { GET_ALL_PROJECTS, ProjectsActionTypes } from '../../actions/projects/actionTypes';

interface ProjectStates {
    projects: Project[] | undefined;
    selectedProject: Project | undefined;
    isError: boolean;
    isLoading: boolean;
    isActionsModalOpen: boolean;
    isDeleteConfirmModalOpen: boolean;
    isDeleteSuccessful: boolean;
    isDeleteError: boolean;
    isDeleteSpinnerLoading: boolean;
}

const initialState: ProjectStates = {
    projects: undefined,
    selectedProject: undefined,
    isError: false,
    isLoading: false,
    isActionsModalOpen: false,
    isDeleteConfirmModalOpen: false,
    isDeleteSuccessful: false,
    isDeleteError: false,
    isDeleteSpinnerLoading: false,
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

const onDeleteConfirmModalToggle = (state: ProjectStates): ProjectStates => {
    const { isDeleteConfirmModalOpen } = state;
    return {
        ...state,
        isDeleteConfirmModalOpen: !isDeleteConfirmModalOpen,
    };
};

const onDeleteSuccessToggle = (state: ProjectStates): ProjectStates => {
    const { isDeleteSuccessful } = state;
    return {
        ...state,
        isDeleteSuccessful: !isDeleteSuccessful,
    };
};

const onDeleteError = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        isDeleteError: data,
    };
};

const onDeleteSpinner = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        isDeleteSpinnerLoading: data,
    };
};

const onRefreshProjectsAfterDelete = (state: ProjectStates, action: ProjectsActionTypes): ProjectStates => {
    const {
        payload: { data },
    } = action;
    const { projects } = state;

    return {
        ...state,
        projects: projects?.filter((project: Project) => project._id !== data._id),
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
        case ON_PROJECT_DELETE_CONFIRM_MODAL_TOGGLE:
            return onDeleteConfirmModalToggle(state);
        case ON_DELETE_SUCCESS:
            return onDeleteSuccessToggle(state);
        case ON_DELETE_ERROR:
            return onDeleteError(state, action);
        case ON_DELETE_SPINNER:
            return onDeleteSpinner(state, action);
        case REFRESH_PROJECTS_AFTER_DELETE:
            return onRefreshProjectsAfterDelete(state, action);

        default:
            return state;
    }
};

export default reducer;
