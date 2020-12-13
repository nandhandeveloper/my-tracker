import { CommonActionTypes, TOGGLE_ADD_MODAL } from './../actionTypes';

export const toggleAddModal = (routePath: string): CommonActionTypes => {
    return {
        type: TOGGLE_ADD_MODAL,
        payload: {
            routePath,
        },
    };
};
