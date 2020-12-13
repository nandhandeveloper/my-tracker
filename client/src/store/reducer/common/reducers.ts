import { TOGGLE_ADD_MODAL, CommonActionTypes } from '../../actions/actionTypes';

interface AddModalStates {
    isProjectAddModalOpen: boolean;
    isStoriesAddModalOpen: boolean;
}

const initialState: AddModalStates = {
    isProjectAddModalOpen: true,
    isStoriesAddModalOpen: false,
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

const reducer = (state: AddModalStates = initialState, action: CommonActionTypes): AddModalStates => {
    switch (action.type) {
        case TOGGLE_ADD_MODAL:
            return toogleAddModal(state, action);
        default:
            return state;
    }
};

export default reducer;
