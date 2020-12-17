import { ActionType } from '../../../models/ActionsModal';

export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const ADD_NEW_PROJECT = 'ADD_NEW_PROJECT';
export const EDIT_NEW_PROJECT = 'EDIT_NEW_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const SPINNER_IN_PROJECT = 'SPINNER_PROJECT';
export const ERROR_IN_PROJECT = 'ERROR_IN_PROJECT';
export const ON_PROJECT_SELECTED = 'ON_PROJECT_SELECTED';
export const ON_PROJECT_ACTIONS_MODAL_TOGGLE = 'ON_PROJECT_ACTIONS_MODAL_TOGGLE';

export type ProjectsActionTypes = ActionType;
