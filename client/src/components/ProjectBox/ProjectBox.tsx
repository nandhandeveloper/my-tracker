import React from 'react';

import { Project, ProjectStatus } from '../../models/Project';
import { Card, CardHeader, Grid, makeStyles, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import * as actions from '../../store/actions/actionCreators';
import clsx from 'clsx';

import Moment from 'react-moment';
import { grey, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    projectBox: {
        padding: theme.spacing(1),
    },
    isSelected: {
        color: green[500],
    },
    isNotSelected: {
        color: 'transparent',
    },
    active: {
        borderTop: `4px solid ${green[500]}`,
    },
    onhold: {
        borderTop: `4px solid ${yellow[700]}`,
    },
    inactive: {
        borderTop: `4px solid ${grey[500]}`,
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
            <Card
                className={clsx({
                    [classes.active]: status === ProjectStatus.ACTIVE,
                    [classes.inactive]: status === ProjectStatus.INACTIVE,
                    [classes.onhold]: status === ProjectStatus.ONHOLD,
                })}
                raised
            >
                <CardHeader
                    avatar={
                        <IconButton aria-label="settings">
                            <CheckCircleIcon
                                className={clsx({
                                    [classes.isSelected]: isChoosen,
                                    [classes.isNotSelected]: !isChoosen,
                                })}
                            />
                        </IconButton>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={() => onClickMenuHandler()}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={
                        <span>
                            <Moment fromNow>{project.createdAt}</Moment>
                        </span>
                    }
                />
            </Card>
        </Grid>
    );
};

export default ProjectBox;
