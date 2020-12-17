import { ActionType } from './../../../models/ActionsModal';
import {
    SPINNER_IN_PROJECT,
    ADD_NEW_PROJECT,
    GET_ALL_PROJECTS,
    ON_PROJECT_SELECTED,
    ON_PROJECT_ACTIONS_MODAL_TOGGLE,
} from './actionTypes';

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from 'axios';
import { RootState } from '../../index';
import { ERROR_IN_PROJECT, ProjectsActionTypes } from './actionTypes';
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

export const onProjectSelected = (projectSelected: Project | undefined): ActionType => {
    return {
        type: ON_PROJECT_SELECTED,
        payload: {
            data: projectSelected,
        },
    };
};

export const onActionsModalToggle = (): ActionType => {
    return {
        type: ON_PROJECT_ACTIONS_MODAL_TOGGLE,
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
