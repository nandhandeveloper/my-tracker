export const TOGGLE_ADD_MODAL = 'TOGGLE_ADD_MODAL';

interface ToggleAddModalActoin {
    type: typeof TOGGLE_ADD_MODAL;
    payload: {
        routePath: string;
    };
}

export type CommonActionTypes = ToggleAddModalActoin;
