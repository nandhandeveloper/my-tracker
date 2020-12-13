import React, { useEffect, useState } from 'react';
import { Button, Paper, Box, makeStyles, Grid } from '@material-ui/core';
import { StoryFormData } from '../../common/formData/StoryFormData';
import { OnInputChangeHandler } from '../../common/DynamicForm/OnInputChangeHandler';
import DynamicFormField from '../DynamicFormGenerator/DynamicFormField';
import { PROJECTS } from '../../common/constants';
import { Project } from '../../models/Project';

const useStyles = makeStyles((theme) => ({
    formLayout: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
    },
}));

const initialState: { [key: string]: any } = StoryFormData;

const AddStoryForm: React.FC<{}> = () => {
    const classes = useStyles();

    const projectsOptionsList = PROJECTS.map(({ _id, name }: Project) => {
        return {
            _id,
            value: name,
            label: name,
        };
    });

    initialState.project.options = [...projectsOptionsList];

    const [storyForm, setStoryForm] = useState<{ [key: string]: any }>(initialState);
    const [isStoryFormValid, setIsStoryFormValid] = useState<boolean>(false);

    useEffect(() => {
        const isFormValid = Object.values(storyForm).every((field) => field.isValid);
        setIsStoryFormValid(isFormValid);
    }, [storyForm]);

    const inputChangeHandler = (
        event: React.ChangeEvent<{
            name?: string;
            value: unknown;
        }>,
    ) => {
        OnInputChangeHandler(event, storyForm, setStoryForm);
    };

    const onAddProjectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            name: { value: nameValue },
            status: { value: statusValue },
            content: { value: contentValue },
            critical: { value: criticalValue },
            technology: { value: technologyValue },
            type: { value: typeValue },
            project: { value: projectValue },
        } = storyForm;

        console.log({
            name: nameValue,
            status: statusValue,
            content: contentValue,
            project: projectValue,
            critical: criticalValue,
            technology: technologyValue,
            type: typeValue,
        });
    };
    return (
        <Paper className={classes.formLayout}>
            <form noValidate onSubmit={onAddProjectSubmit}>
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
                        <Grid container justify="flex-end">
                            <Button type="submit" variant="contained" color="primary" disabled={!isStoryFormValid}>
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

export default AddStoryForm;
