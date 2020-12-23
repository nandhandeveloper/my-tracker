import { Project } from './../../../models/Project';
import { CommonActionTypes, TOGGLE_ADD_MODAL, LOADING_SPINNER_TOGGLE, APP_ERROR_TOGGLE } from './actionTypes';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../index';

import axios from 'axios';
import { getProjectsDispatch } from '../projects/actions';
import { getStoriesDispatch } from '../stories/actions';

export const toggleAddModal = (routePath: string): CommonActionTypes => {
    return {
        type: TOGGLE_ADD_MODAL,
        payload: {
            routePath,
        },
    };
};

export const loadingSpinnerDispatch = (data: boolean): CommonActionTypes => {
    return {
        type: LOADING_SPINNER_TOGGLE,
        payload: {
            data,
        },
    };
};

export const applicationErrorDispatch = (data: boolean): CommonActionTypes => {
    return {
        type: APP_ERROR_TOGGLE,
        payload: {
            data,
        },
    };
};

export const onInitialLoadData = (): ThunkAction<void, RootState, unknown, Action<string>> => {
    return async (dispatch) => {
        try {
            dispatch(loadingSpinnerDispatch(true));
            dispatch(applicationErrorDispatch(false));
            const projectsResponse = await axios.get('http://localhost:8080/api/projects');
            const projects: Project[] = projectsResponse.data;
            dispatch(getProjectsDispatch(projects));
            const selectedProject = projects.filter((project: Project) => project.isChoosen).pop();
            if (selectedProject) {
                const projectId = selectedProject?._id;
                const storiesResponse = await axios.get(`http://localhost:8080/api/stories/project/${projectId}`);
                dispatch(getStoriesDispatch(storiesResponse.data));
            }
        } catch (error) {
            console.log(error);
            dispatch(applicationErrorDispatch(true));
        } finally {
            dispatch(loadingSpinnerDispatch(false));
        }
    };
};
