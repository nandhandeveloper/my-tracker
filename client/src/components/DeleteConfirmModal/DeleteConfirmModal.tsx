import React, { useEffect } from 'react';
import { DeleteProjectConfirmData } from './../../common/formData/DeleteProjectConfirmData';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState } from 'react';
import DynamicFormField from '../DynamicFormGenerator/DynamicFormField';
import { OnInputChangeHandler } from '../../common/DynamicForm/OnInputChangeHandler';

import * as actions from '../../store/actions/actionCreators';
import Spinner, { SPINNERCOLOR } from '../Spinner/Spinner';

type Props = {
    isOpen: boolean;
    type: string;
    onCloseModal: () => void;
};

const initialState = DeleteProjectConfirmData;

const DeleteConfirmModal: React.FC<Props> = ({ isOpen, type, onCloseModal }: Props) => {
    const dispatch = useDispatch();
    const [projectConfirmForm, setProjectConfirmForm] = useState<{ [key: string]: any }>(initialState);
    const [isProjectConfirmFormValid, setIsProjectConfirmFormValid] = useState<boolean>(false);
    const {
        projectsRed: { selectedProject, isDeleteSpinnerLoading },
    } = useSelector((state: RootState) => state);
    const onDeleteProject = () => dispatch(actions.onDeleteProject(selectedProject!));

    useEffect(() => {
        const isFormValid = Object.values(projectConfirmForm).every((field) => field.isValid);
        setIsProjectConfirmFormValid(isFormValid);
    }, [projectConfirmForm]);

    const inputChangeHandler = (
        event: React.ChangeEvent<{
            name?: string;
            value: unknown;
        }>,
    ) => {
        OnInputChangeHandler(event, projectConfirmForm, setProjectConfirmForm);
    };

    const onDeleteProjectHandler = () => {
        onDeleteProject();
        setProjectConfirmForm(initialState);
    };

    return (
        <Dialog open={isOpen} onClose={onCloseModal}>
            <DialogTitle id="alert-dialog-title">
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" color="secondary" align="center">
                            <strong>
                                {type.charAt(0).toUpperCase() + type.substring(1).toLowerCase() + ' '} Delete
                                Confirmation
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deleting a project is considered as a criticial operation. This action would permanently delete the
                    selected Project and its related stories. This action cannot be undone.
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="h6" align="center">
                        <strong>{selectedProject?.name}</strong>
                    </Typography>
                </DialogContentText>
                {Object.values(projectConfirmForm).map((formField) => (
                    <DynamicFormField
                        key={formField.name}
                        controlDetails={formField}
                        onInputChangeHandler={inputChangeHandler}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                {isDeleteSpinnerLoading ? (
                    <Grid container direction="column" alignItems="center">
                        <Spinner color={SPINNERCOLOR.SECONDARY} text="deleting" />
                    </Grid>
                ) : (
                    <>
                        <Button onClick={onCloseModal} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={onDeleteProjectHandler}
                            color="secondary"
                            disabled={
                                !(
                                    isProjectConfirmFormValid &&
                                    selectedProject?.name === projectConfirmForm.projectname.value
                                )
                            }
                        >
                            Delete
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmModal;
