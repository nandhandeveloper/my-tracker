import {
    SPINNER_IN_PROJECT,
    ADD_NEW_PROJECT,
    GET_ALL_PROJECTS,
    ON_PROJECT_SELECTED,
    ON_PROJECT_ACTIONS_MODAL_TOGGLE,
    ON_PROJECT_DELETE_CONFIRM_MODAL_TOGGLE,
    ON_DELETE_SPINNER,
    ON_DELETE_ERROR,
    ON_DELETE_SUCCESS,
    REFRESH_PROJECTS_AFTER_DELETE,
    ON_REFRESH_PROJECTS_AFTER_MODIFY,
    MODIFIED_PROJECT_ERROR,
    MODIFY_PROJECT_SUCCESS_TOGGLE,
    MODIFIED_PROJECT_SPINNER,
    ERROR_IN_PROJECT,
    ProjectsActionTypes,
} from './actionTypes';

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from 'axios';
import { RootState } from '../../index';
import { AddProject, Project } from '../../../models/Project';
import { toggleAddModal } from '../actionCreators';

const projectError = (isError: boolean): ProjectsActionTypes => {
    return {
        type: ERROR_IN_PROJECT,
        payload: {
            isError,
        },
    };
};

const projetSpinner = (isLoading: boolean): ProjectsActionTypes => {
    return {
        type: SPINNER_IN_PROJECT,
        payload: {
            isLoading,
        },
    };
};

const addNewProjectDispatch = (newProject: Project) => {
    return {
        type: ADD_NEW_PROJECT,
        payload: {
            data: newProject,
        },
    };
};

const getProjectsDispatch = (data: Project[]) => {
    return {
        type: GET_ALL_PROJECTS,
        payload: {
            data,
        },
    };
};

export const onProjectSelected = (projectSelected: Project | undefined): ProjectsActionTypes => {
    return {
        type: ON_PROJECT_SELECTED,
        payload: {
            data: projectSelected,
        },
    };
};

export const onActionsModalToggle = (): ProjectsActionTypes => {
    return {
        type: ON_PROJECT_ACTIONS_MODAL_TOGGLE,
        payload: {
            data: null,
        },
    };
};

export const onDeleteConfirmModalToggle = (): ProjectsActionTypes => {
    return {
        type: ON_PROJECT_DELETE_CONFIRM_MODAL_TOGGLE,
        payload: {
            data: null,
        },
    };
};

export const deleteProjectError = (isError: boolean): ProjectsActionTypes => {
    return {
        type: ON_DELETE_ERROR,
        payload: {
            data: isError,
        },
    };
};

export const deleteProjectSpinner = (isLoading: boolean): ProjectsActionTypes => {
    return {
        type: ON_DELETE_SPINNER,
        payload: {
            data: isLoading,
        },
    };
};

export const deleteProjectSuccessToggle = (): ProjectsActionTypes => {
    return {
        type: ON_DELETE_SUCCESS,
        payload: {
            data: true,
        },
    };
};

export const onRefreshProjectsAfterDelete = (project: Project): ProjectsActionTypes => {
    return {
        type: REFRESH_PROJECTS_AFTER_DELETE,
        payload: {
            data: project,
        },
    };
};

export const modifiedProjectError = (isError: boolean): ProjectsActionTypes => {
    return {
        type: MODIFIED_PROJECT_ERROR,
        payload: {
            data: isError,
        },
    };
};

export const modifiedProjectSpinner = (isLoading: boolean): ProjectsActionTypes => {
    return {
        type: MODIFIED_PROJECT_SPINNER,
        payload: {
            data: isLoading,
        },
    };
};

export const onRefreshProjectsAfterModify = (modifiedProject: boolean): ProjectsActionTypes => {
    return {
        type: ON_REFRESH_PROJECTS_AFTER_MODIFY,
        payload: {
            data: modifiedProject,
        },
    };
};

export const modifyProjectSuccessToggle = (): ProjectsActionTypes => {
    return {
        type: MODIFY_PROJECT_SUCCESS_TOGGLE,
        payload: {
            data: null,
        },
    };
};

export const getAllProjects = (): ThunkAction<void, RootState, unknown, Action<string>> => {
    return async (dispatch) => {
        try {
            dispatch(projectError(false));
            dispatch(projetSpinner(true));
            const response = await axios.get('http://localhost:8080/api/projects');
            dispatch(getProjectsDispatch(response.data));
        } catch (error) {
            console.log(error);
            dispatch(projectError(true));
        } finally {
            dispatch(projetSpinner(false));
        }
    };
};

export const addNewProject = (newProject: AddProject): ThunkAction<void, RootState, unknown, Action<string>> => {
    return async (dispatch) => {
        try {
            dispatch(projectError(false));
            dispatch(projetSpinner(true));
            const response = await axios.post('http://localhost:8080/api/projects', newProject);
            dispatch(addNewProjectDispatch(response.data));
            dispatch(toggleAddModal('projects'));
        } catch (error) {
            console.log(error);
            dispatch(projectError(true));
        } finally {
            dispatch(projetSpinner(false));
        }
    };
};

export const onProjectSelectedForTracking = (
    project: Project,
): ThunkAction<void, RootState, unknown, Action<string>> => {
    // TODO from backend
    return async (dispatch) => {
        try {
            dispatch(projectError(false));
            dispatch(projetSpinner(true));
            const response = await axios.post('http://localhost:8080/api/projects', project);
            dispatch(addNewProjectDispatch(response.data));
            dispatch(toggleAddModal('projects'));
        } catch (error) {
            console.log(error);
            dispatch(projectError(true));
        } finally {
            dispatch(projetSpinner(false));
        }
    };
};

export const onDeleteProject = (project: Project): ThunkAction<void, RootState, unknown, Action<string>> => {
    // TODO from backend
    return async (dispatch) => {
        try {
            dispatch(deleteProjectError(false));
            dispatch(deleteProjectSpinner(true));
            await axios.delete(`http://localhost:8080/api/projects/${project._id}`);
            dispatch(onRefreshProjectsAfterDelete(project));
            dispatch(onDeleteConfirmModalToggle());
            dispatch(deleteProjectSuccessToggle());
        } catch (error) {
            console.log(error);
            dispatch(deleteProjectError(true));
        } finally {
            dispatch(deleteProjectSpinner(false));
        }
    };
};

export const onModifyProject = (
    modifiedProject: AddProject,
    id: string,
): ThunkAction<void, RootState, unknown, Action<string>> => {
    // TODO from backend
    return async (dispatch) => {
        try {
            dispatch(modifiedProjectError(false));
            dispatch(modifiedProjectSpinner(true));
            const response = await axios.put(`http://localhost:8080/api/projects/${id}`, modifiedProject);
            dispatch(onRefreshProjectsAfterModify(response.data));
            dispatch(toggleAddModal('projects'));
            dispatch(modifyProjectSuccessToggle());
        } catch (error) {
            console.log(error);
            dispatch(modifiedProjectError(true));
        } finally {
            dispatch(modifiedProjectSpinner(false));
        }
    };
};
