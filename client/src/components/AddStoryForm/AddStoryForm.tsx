import React, { useEffect, useState } from 'react';
import { Button, Paper, Box, makeStyles, Grid } from '@material-ui/core';
import { StoryFormData } from '../../common/formData/StoryFormData';
import { OnInputChangeHandler } from '../../common/DynamicForm/OnInputChangeHandler';
import DynamicFormField from '../DynamicFormGenerator/DynamicFormField';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Project } from '../../models/Project';
import { InputTextValidations } from '../../common/DynamicForm/InputTextValidation';

import * as actions from './../../store/actions/stories/actions';
import { AddStory, Story } from '../../models/Story';
import Spinner, { SPINNERCOLOR } from '../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
    formLayout: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
    },
}));

const initialState: { [key: string]: any } = StoryFormData;

const AddStoryForm: React.FC<Record<string, never>> = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {
        projectsRed: { projects, selectedProjectTracking, },
        storiesRed: { selectedStory, isModifiedSpinnerLoading },
    } = useSelector((state: RootState) => state);

    const projectsOptionsList = projects?.map(({ _id, name }: Project) => {
        return {
            _id,
            value: name,
            label: name,
        };
    });
    initialState.project.options = [...(projectsOptionsList || [])];
    initialState.project.value = selectedProjectTracking?.name || '';

    const [storyForm, setStoryForm] = useState<{ [key: string]: any }>(initialState);
    const [isStoryFormValid, setIsStoryFormValid] = useState<boolean>(false);

    const onAddNewStroy = (newStroy: AddStory) => dispatch(actions.addNewStory(newStroy));
    const onEditStory = (editStory: Story, storyId: string) =>
        dispatch(actions.onModifyStory(editStory, storyId, true));

    useEffect(() => {
        const isFormValid = Object.values(storyForm).every((field) => field.isValid);
        setIsStoryFormValid(isFormValid);
    }, [storyForm]);

    // USED FOR MODIFY PROJECT DETAILS
    useEffect(() => {
        if (selectedStory) {
            const copyStoryForm = JSON.parse(JSON.stringify(initialState));
            // Assign Selected project values
            copyStoryForm.content.value = selectedStory.content;
            copyStoryForm.project.value = selectedStory.project.name;
            copyStoryForm.critical.value = selectedStory.critical;
            copyStoryForm.technology.value = selectedStory.technology;
            copyStoryForm.type.value = selectedStory.type;
            copyStoryForm.status.value = selectedStory.status;

            // Validating the Fields
            copyStoryForm.content.isValid =
                InputTextValidations(copyStoryForm.content.validations, copyStoryForm.content.value).length === 0;
            copyStoryForm.project.isValid =
                InputTextValidations(copyStoryForm.project.validations, copyStoryForm.project.value).length === 0;
            copyStoryForm.critical.isValid =
                InputTextValidations(copyStoryForm.critical.validations, copyStoryForm.critical.value).length === 0;
            copyStoryForm.technology.isValid =
                InputTextValidations(copyStoryForm.technology.validations, copyStoryForm.technology.value).length === 0;
            copyStoryForm.type.isValid =
                InputTextValidations(copyStoryForm.type.validations, copyStoryForm.type.value).length === 0;
            copyStoryForm.status.isValid =
                InputTextValidations(copyStoryForm.status.validations, copyStoryForm.status.value).length === 0;

            setStoryForm(copyStoryForm);
        } else {
            setStoryForm(initialState);
        }
    }, [selectedStory]);

    const inputChangeHandler = (
        event: React.ChangeEvent<{
            name?: string;
            value: unknown;
        }>,
    ) => {
        OnInputChangeHandler(event, storyForm, setStoryForm);
    };

    const onSaveStorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            status: { value: statusValue },
            content: { value: contentValue },
            critical: { value: criticalValue },
            technology: { value: technologyValue },
            type: { value: typeValue },
            project: { value: projectValue },
        } = storyForm;
        const project = projects?.filter((projectObj) => projectObj.name === projectValue).pop();
        const newStory: AddStory = {
            status: statusValue,
            content: contentValue,
            project: project!,
            critical: criticalValue,
            technology: technologyValue,
            type: typeValue,
        };
        if (selectedStory) {
            const modifiedStory: Story = { ...selectedStory, ...newStory };
            onEditStory(modifiedStory, modifiedStory._id);
        } else {
            onAddNewStroy(newStory);
        }
    };
    return (
        <Paper className={classes.formLayout}>
            <form noValidate onSubmit={onSaveStorySubmit}>
                <Grid container>
                    <Grid item xs={false} sm={2} lg={4}></Grid>
                    <Grid item xs={12} sm={8} lg={4}>
                        {Object.values(storyForm).map((formField) => (
                            <DynamicFormField
                                key={formField.name}
                                controlDetails={formField}
                                onInputChangeHandler={inputChangeHandler}
                            />
                        ))}

                        <Box m={4}></Box>

                        <Grid container justify={isModifiedSpinnerLoading ? 'center' : 'flex-end'}>
                            {isModifiedSpinnerLoading ? (
                                <Spinner color={SPINNERCOLOR.SECONDARY} text="Saving Data" />
                            ) : (
                                <Button type="submit" variant="contained" color="primary" disabled={!isStoryFormValid}>
                                    Submit
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={false} sm={2} lg={4}></Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddStoryForm;
