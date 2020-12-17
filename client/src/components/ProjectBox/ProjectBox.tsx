import React from 'react';

import { Project } from '../../models/Project';
import { Card, CardHeader, Grid, makeStyles, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import * as actions from '../../store/actions/actionCreators';

const useStyles = makeStyles((theme) => ({
    projectBox: {
        padding: theme.spacing(1),
    },
    isSelected: {
        color: green[500],
    },
}));

type Props = {
    project: Project;
};
const ProjectBox: React.FC<Props> = ({ project }: Props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { name, status, isChoosen } = project;
    const onMenuClick = (selectedProject: Project) => dispatch(actions.onProjectSelected(selectedProject));
    const toggleActionsModal = () => dispatch(actions.onActionsModalToggle());

    const onClickMenuHandler = () => {
        onMenuClick(project);
        toggleActionsModal();
    };
    return (
        <Grid item xs={12} sm={6} lg={4} className={classes.projectBox}>
            <Card raised>
                <CardHeader
                    avatar={
                        <IconButton aria-label="settings">
                            {isChoosen && <CheckCircleIcon className={classes.isSelected} />}
                        </IconButton>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={() => onClickMenuHandler()}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={status}
                />
            </Card>
        </Grid>
    );
};

export default ProjectBox;
