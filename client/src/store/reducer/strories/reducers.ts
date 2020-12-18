import {
    SPINNER_IN_PROJECT,
    ADD_NEW_PROJECT,
    ON_PROJECT_SELECTED,
    ON_PROJECT_DELETE_CONFIRM_MODAL_TOGGLE,
    ON_DELETE_SUCCESS,
    ON_DELETE_ERROR,
    ON_DELETE_SPINNER,
    REFRESH_PROJECTS_AFTER_DELETE,
    ON_REFRESH_PROJECTS_AFTER_MODIFY,
    MODIFIED_PROJECT_SPINNER,
    MODIFIED_PROJECT_ERROR,
    MODIFY_PROJECT_SUCCESS_TOGGLE,
} from '../../actions/projects/actionTypes';
import { GET_ALL_PROJECTS, ProjectsActionTypes } from '../../actions/projects/actionTypes';
import { Story } from '../../../models/Story';

interface StoriesStates {
    stories: Story[] | undefined;
    selectedStory: Story | undefined;
    isError: boolean;
    isLoading: boolean;
    isDeleteConfirmModalOpen: boolean;
    isDeleteSuccessful: boolean;
    isDeleteError: boolean;
    isDeleteSpinnerLoading: boolean;
    isModifiedSpinnerLoading: boolean;
    isModifiedStoryError: boolean;
    isModifiedStorySuccess: boolean;
}

const initialState: StoriesStates = {
    stories: undefined,
    selectedStory: undefined,
    isError: false,
    isLoading: false,
    isDeleteConfirmModalOpen: false,
    isDeleteSuccessful: false,
    isDeleteError: false,
    isDeleteSpinnerLoading: false,
    isModifiedSpinnerLoading: false,
    isModifiedStoryError: false,
    isModifiedStorySuccess: false,
};

const getAllStories = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        stories: data,
    };
};

const toggleSpinner = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { isLoading },
    } = action;
    return {
        ...state,
        isLoading,
    };
};

const addNewStory = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const { stories } = state;
    const {
        payload: { data },
    } = action;
    stories?.push(data);
    return {
        ...state,
        stories,
    };
};

const onStorySelected = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        selectedStory: data,
    };
};

const onDeleteConfirmModalToggle = (state: StoriesStates): StoriesStates => {
    const { isDeleteConfirmModalOpen } = state;
    return {
        ...state,
        isDeleteConfirmModalOpen: !isDeleteConfirmModalOpen,
    };
};

const onDeleteSuccessToggle = (state: StoriesStates): StoriesStates => {
    const { isDeleteSuccessful } = state;
    return {
        ...state,
        isDeleteSuccessful: !isDeleteSuccessful,
    };
};

const onDeleteError = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        isDeleteError: data,
    };
};

const onDeleteSpinner = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        isDeleteSpinnerLoading: data,
    };
};

const onRefreshStoriesAfterDelete = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;
    const { stories } = state;

    return {
        ...state,
        stories: stories?.filter((stroy: Story) => stroy._id !== data._id),
    };
};

const onRefreshStoriesAfterModify = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data: modifiedStory },
    } = action;
    const { stories } = state;

    return {
        ...state,
        stories: stories?.map((story: Story) => {
            if (story._id === modifiedStory._id) {
                return modifiedStory;
            } else {
                return story;
            }
        }),
        selectedStory: undefined,
    };
};
const modifiedStorySpinner = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;

    return {
        ...state,
        isModifiedSpinnerLoading: data,
    };
};
const modifiedStoryError = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;

    return {
        ...state,
        isModifiedStoryError: data,
    };
};

const modifiedStorySuccessToggle = (state: StoriesStates, action: ProjectsActionTypes): StoriesStates => {
    const {
        payload: { data },
    } = action;

    return {
        ...state,
        isModifiedStorySuccess: data,
    };
};

const reducer = (state: StoriesStates = initialState, action: ProjectsActionTypes): StoriesStates => {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            return getAllStories(state, action);
        case SPINNER_IN_PROJECT:
            return toggleSpinner(state, action);
        case ADD_NEW_PROJECT:
            return addNewStory(state, action);
        case ON_PROJECT_SELECTED:
            return onStorySelected(state, action);
        case ON_PROJECT_DELETE_CONFIRM_MODAL_TOGGLE:
            return onDeleteConfirmModalToggle(state);
        case ON_DELETE_SUCCESS:
            return onDeleteSuccessToggle(state);
        case ON_DELETE_ERROR:
            return onDeleteError(state, action);
        case ON_DELETE_SPINNER:
            return onDeleteSpinner(state, action);
        case REFRESH_PROJECTS_AFTER_DELETE:
            return onRefreshStoriesAfterDelete(state, action);
        case ON_REFRESH_PROJECTS_AFTER_MODIFY:
            return onRefreshStoriesAfterModify(state, action);
        case MODIFIED_PROJECT_SPINNER:
            return modifiedStorySpinner(state, action);
        case MODIFIED_PROJECT_ERROR:
            return modifiedStoryError(state, action);
        case MODIFY_PROJECT_SUCCESS_TOGGLE:
            return modifiedStorySuccessToggle(state, action);

        default:
            return state;
    }
};

export default reducer;
