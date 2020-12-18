import {
    GET_ALL_STORIES,
    ADD_NEW_STORY,
    SPINNER_IN_STORY,
    ERROR_IN_STORY,
    ON_STORY_SELECTED,
    ON_STORY_DELETE_CONFIRM_MODAL_TOGGLE,
    ON_DELETE_SUCCESS,
    ON_DELETE_ERROR,
    ON_DELETE_SPINNER,
    REFRESH_STORYS_AFTER_DELETE,
    ON_REFRESH_STORYS_AFTER_MODIFY,
    MODIFIED_STORY_SPINNER,
    MODIFIED_STORY_ERROR,
    MODIFY_STORY_SUCCESS_TOGGLE,
    storiesActionTypes,
} from './actionTypes';

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import axios from 'axios';
import { RootState } from '../../index';

import { AddProject } from '../../../models/Project';
import { Story } from './../../../models/Story';

import { toggleAddModal } from '../actionCreators';

const storiesError = (isError: boolean): storiesActionTypes => {
    return {
        type: ERROR_IN_STORY,
        payload: {
            isError,
        },
    };
};

const storiesSpinner = (isLoading: boolean): storiesActionTypes => {
    return {
        type: SPINNER_IN_STORY,
        payload: {
            isLoading,
        },
    };
};

const addNewStoryDispatch = (newStory: Story): storiesActionTypes => {
    return {
        type: ADD_NEW_STORY,
        payload: {
            data: newStory,
        },
    };
};

const getStoriesDispatch = (data: Story[]) => {
    return {
        type: GET_ALL_STORIES,
        payload: {
            data,
        },
    };
};

export const onStorySelected = (storySelected: Story | undefined): storiesActionTypes => {
    return {
        type: ON_STORY_SELECTED,
        payload: {
            data: storySelected,
        },
    };
};

export const onDeleteConfirmModalToggle = (): storiesActionTypes => {
    return {
        type: ON_STORY_DELETE_CONFIRM_MODAL_TOGGLE,
        payload: {
            data: null,
        },
    };
};

export const deleteStoryError = (isError: boolean): storiesActionTypes => {
    return {
        type: ON_DELETE_ERROR,
        payload: {
            data: isError,
        },
    };
};

export const deleteStorySpinner = (isLoading: boolean): storiesActionTypes => {
    return {
        type: ON_DELETE_SPINNER,
        payload: {
            data: isLoading,
        },
    };
};

export const deleteStorySuccessToggle = (): storiesActionTypes => {
    return {
        type: ON_DELETE_SUCCESS,
        payload: {
            data: true,
        },
    };
};

export const onRefreshStoriesAfterDelete = (stroy: Story): storiesActionTypes => {
    return {
        type: REFRESH_STORYS_AFTER_DELETE,
        payload: {
            data: stroy,
        },
    };
};

export const modifiedStoryError = (isError: boolean): storiesActionTypes => {
    return {
        type: MODIFIED_STORY_ERROR,
        payload: {
            data: isError,
        },
    };
};

export const modifiedStorySpinner = (isLoading: boolean): storiesActionTypes => {
    return {
        type: MODIFIED_STORY_SPINNER,
        payload: {
            data: isLoading,
        },
    };
};

export const onRefreshStoriesAfterModify = (modifiedProject: boolean): storiesActionTypes => {
    return {
        type: ON_REFRESH_STORYS_AFTER_MODIFY,
        payload: {
            data: modifiedProject,
        },
    };
};

export const modifyStorySuccessToggle = (): storiesActionTypes => {
    return {
        type: MODIFY_STORY_SUCCESS_TOGGLE,
        payload: {
            data: null,
        },
    };
};

export const getAllStories = (): ThunkAction<void, RootState, unknown, Action<string>> => {
    return async (dispatch) => {
        try {
            dispatch(storiesError(false));
            dispatch(storiesSpinner(true));
            // Update end point for particular project only
            const response = await axios.get('http://localhost:8080/api/stories');
            dispatch(getStoriesDispatch(response.data));
        } catch (error) {
            console.log(error);
            dispatch(storiesError(true));
        } finally {
            dispatch(storiesSpinner(false));
        }
    };
};
// Update the type used for new stroy
export const addNewStory = (newStoy: AddProject): ThunkAction<void, RootState, unknown, Action<string>> => {
    return async (dispatch) => {
        try {
            dispatch(storiesError(false));
            dispatch(storiesSpinner(true));
            //Update endpoint
            const response = await axios.post('http://localhost:8080/api/stories', newStoy);
            dispatch(addNewStoryDispatch(response.data));
            dispatch(toggleAddModal('stories'));
        } catch (error) {
            console.log(error);
            dispatch(storiesError(true));
        } finally {
            dispatch(storiesSpinner(false));
        }
    };
};

export const onDeleteStory = (story: Story): ThunkAction<void, RootState, unknown, Action<string>> => {
    // TODO from backend
    return async (dispatch) => {
        try {
            dispatch(deleteStoryError(false));
            dispatch(deleteStorySpinner(true));
            // Update the end point
            await axios.delete(`http://localhost:8080/api/stories/${story._id}`);
            dispatch(onRefreshStoriesAfterDelete(story));
            dispatch(onDeleteConfirmModalToggle());
            dispatch(deleteStorySuccessToggle());
        } catch (error) {
            console.log(error);
            dispatch(deleteStoryError(true));
        } finally {
            dispatch(deleteStorySpinner(false));
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
            dispatch(modifiedStoryError(false));
            dispatch(modifiedStorySpinner(true));
            const response = await axios.put(`http://localhost:8080/api/projects/${id}`, modifiedProject);
            dispatch(onRefreshStoriesAfterDelete(response.data));
            dispatch(toggleAddModal('stories'));
            dispatch(modifyStorySuccessToggle());
        } catch (error) {
            console.log(error);
            dispatch(modifiedStoryError(true));
        } finally {
            dispatch(modifiedStorySpinner(false));
        }
    };
};
