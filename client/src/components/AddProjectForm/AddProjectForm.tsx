import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Paper, Box, makeStyles, Grid } from '@material-ui/core';
import { ProjectFormData } from '../../common/formData/ProjectFormData';
import { OnInputChangeHandler } from '../../common/DynamicForm/OnInputChangeHandler';
import DynamicFormField from '../DynamicFormGenerator/DynamicFormField';

import * as actions from '../../store/actions/actionCreators';
import { AddProject } from '../../models/Project';
import { RootState } from '../../store';
import { InputTextValidations } from '../../common/DynamicForm/InputTextValidation';

const useStyles = makeStyles((theme) => ({
    formLayout: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
    },
}));

const initialState = ProjectFormData;
const AddProjectForm: React.FC<Record<string, never>> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [projectForm, setProjectForm] = useState<{ [key: string]: any }>(initialState);
    const [isProjectFormValid, setIsProjectFormValid] = useState<boolean>(false);

    const {
        projectsRed: { selectedProject },
    } = useSelector((state: RootState) => state);

    const onAddNewProject = (newProject: AddProject) => dispatch(actions.addNewProject(newProject));
    const onModifyProject = (modifiedProject: AddProject, projectId: string) =>
        dispatch(actions.onModifyProject(modifiedProject, projectId));

    // USED FOR MODIFY PROJECT DETAILS
    useEffect(() => {
        if (selectedProject) {
            const copyProjectForm = JSON.parse(JSON.stringify(initialState));
            // Assign Selected project values
            copyProjectForm.name.value = selectedProject.name;
            copyProjectForm.status.value = selectedProject.status;

            // Validating the Fields
            copyProjectForm.name.isValid =
                InputTextValidations(copyProjectForm.name.validations, copyProjectForm.name.value).length === 0;
            copyProjectForm.status.isValid =
                InputTextValidations(copyProjectForm.status.validations, copyProjectForm.status.value).length === 0;

            setProjectForm(copyProjectForm);
        } else {
            setProjectForm(initialState);
        }
    }, [selectedProject]);

    useEffect(() => {
        const isFormValid = Object.values(projectForm).every((field) => field.isValid);
        setIsProjectFormValid(isFormValid);
    }, [projectForm]);

    const inputChangeHandler = (
        event: React.ChangeEvent<{
            name?: string;
            value: unknown;
        }>,
    ) => {
        OnInputChangeHandler(event, projectForm, setProjectForm);
    };

    const onAddProjectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            name: { value: nameValue },
            status: { value: statusValue },
        } = projectForm;
        const formatedName = nameValue
            .trim()
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
            .join(' ');
        const newProject: AddProject = { name: formatedName, status: statusValue, isChoosen: false };
        if (selectedProject) {
            onModifyProject(newProject, selectedProject._id);
        } else {
            onAddNewProject(newProject);
        }
    };
    return (
        <Paper className={classes.formLayout}>
            <form noValidate onSubmit={onAddProjectSubmit}>
                <Grid container>
                    <Grid item xs={false} sm={2} lg={4}></Grid>
                    <Grid item xs={12} sm={8} lg={4}>
                        {Object.values(projectForm).map((formField) => (
                            <DynamicFormField
                                key={formField.name}
                                controlDetails={formField}
                                onInputChangeHandler={inputChangeHandler}
                            />
                        ))}

                        <Box m={4}></Box>
                        <Grid container justify="flex-end">
                            <Button type="submit" variant="contained" color="primary" disabled={!isProjectFormValid}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={false} sm={2} lg={4}></Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddProjectForm;
