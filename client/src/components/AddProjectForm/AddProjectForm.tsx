import React, { useEffect, useState } from 'react';
import { Button, Paper, Box, makeStyles, Grid } from '@material-ui/core';
import { ProjectFormData } from '../../common/formData/ProjectFormData';
import { OnInputChangeHandler } from '../../common/DynamicForm/OnInputChangeHandler';
import DynamicFormField from '../DynamicFormGenerator/DynamicFormField';

const useStyles = makeStyles((theme) => ({
    formLayout: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4)
    },
}));

const initialState = ProjectFormData;
const AddProjectForm: React.FC<{}> = () => {
    const classes = useStyles();

    const [projectForm, setProjectForm] = useState<{ [key: string]: any }>(initialState);
    const [isProjectFormValid, setIsProjectFormValid] = useState<boolean>(false);

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
        console.log(projectForm);
        const {
            name: { value: nameValue },
            status: { value: statusValue },
        } = projectForm;

        console.log({ name: nameValue, status: statusValue });
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
