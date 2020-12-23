import {
    CommonActionTypes,
    TOGGLE_ADD_MODAL,
    LOADING_SPINNER_TOGGLE,
    APP_ERROR_TOGGLE,
} from '../../actions/common/actionTypes';

interface AddModalStates {
    isProjectAddModalOpen: boolean;
    isStoriesAddModalOpen: boolean;
    isLoading: boolean;
    isError: boolean;
}

const initialState: AddModalStates = {
    isProjectAddModalOpen: false,
    isStoriesAddModalOpen: false,
    isLoading: false,
    isError: false,
};

const toogleAddModal = (state: AddModalStates, action: CommonActionTypes) => {
    const {
        payload: { routePath },
    } = action;
    const { isProjectAddModalOpen, isStoriesAddModalOpen } = state;
    return {
        ...state,
        isProjectAddModalOpen: routePath === 'projects' ? !isProjectAddModalOpen : isProjectAddModalOpen,
        isStoriesAddModalOpen: routePath === 'stories' ? !isStoriesAddModalOpen : isStoriesAddModalOpen,
    };
};

const loadingSpinnerToggle = (state: AddModalStates, action: CommonActionTypes) => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        isLoading: data,
    };
};

const appErrorToggle = (state: AddModalStates, action: CommonActionTypes) => {
    const {
        payload: { data },
    } = action;
    return {
        ...state,
        isError: data,
    };
};

const reducer = (state: AddModalStates = initialState, action: CommonActionTypes): AddModalStates => {
    switch (action.type) {
        case TOGGLE_ADD_MODAL:
            return toogleAddModal(state, action);
        case LOADING_SPINNER_TOGGLE:
            return loadingSpinnerToggle(state, action);
        case APP_ERROR_TOGGLE:
            return appErrorToggle(state, action);
        default:
            return state;
    }
};

export default reducer;
