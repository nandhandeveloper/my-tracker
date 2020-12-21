import React from 'react';
import { Project } from '../../models/Project';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/actionCreators';

enum ProjectMenuActions {
    Delete,
    Modify,
    Select,
}

const useStyles = makeStyles((theme) => ({
    actionIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    actionButton: {
        padding: theme.spacing(1),
    },
    selectBtn: {
        background: green[500],
        '&:hover': {
            background: green[700],
        },
    },
}));

type Props = {
    isOpen: boolean;
    project?: Project;
    onCloseModal: () => void;
    onDeleteHandler: () => void;
    onEditHandler: () => void;
};

const ProjectActionsModal: React.FC<Props> = ({
    isOpen,
    project,
    onCloseModal,
    onDeleteHandler,
    onEditHandler,
}: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onProjectSelectedForTracking = (selectedProject: Project) =>
        dispatch(actions.onProjectSelectedForTracking(selectedProject));
    const onProjectSelected = () => dispatch(actions.onProjectSelected(undefined));

    const onActionButtonClicked = (actiontype: ProjectMenuActions) => {
        switch (actiontype) {
            case ProjectMenuActions.Delete:
                onDeleteHandler();
                break;
            case ProjectMenuActions.Modify:
                onEditHandler();
                break;
            case ProjectMenuActions.Select:
                onProjectSelectedForTracking(project!);
                onProjectSelected();
                break;
        }
    };
    return (
        <Dialog open={isOpen} onClose={onCloseModal}>
            <DialogTitle id="alert-dialog-title">
                <Grid container justify="center" alignItems="center">
                    <Grid item className={classes.actionIcon}>
                        <SettingsIcon color="secondary" />
                    </Grid>

                    <Grid item>
                        <Typography variant="h6" color="secondary">
                            <strong>Actions</strong>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please choose any of the following actions to apply on the project
                </DialogContentText>
                <DialogContentText id="alert-dialog-project-name">
                    <Typography variant="h6" align="center">
                        <strong>{project?.name}</strong>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="center" alignItems="center">
                    <Grid xs={12} sm={3} className={classes.actionButton}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => onActionButtonClicked(ProjectMenuActions.Delete)}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={3} className={classes.actionButton}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => onActionButtonClicked(ProjectMenuActions.Modify)}
                            startIcon={<EditIcon />}
                        >
                            Modify
                        </Button>
                    </Grid>
                    {project?.isChoosen === false && (
                        <Grid xs={12} sm={3} className={classes.actionButton}>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.selectBtn}
                                color="primary"
                                onClick={() => onActionButtonClicked(ProjectMenuActions.Select)}
                                startIcon={<CheckCircleIcon />}
                            >
                                Select
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectActionsModal;
