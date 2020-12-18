import React from 'react';
import { Story, StoryCritical, StoryStatus } from '../../models/Story';

import { Card, CardContent, Grid, IconButton, makeStyles, Switch, Typography } from '@material-ui/core';
import { green, grey, orange, red, yellow } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    taskBox: {
        margin: theme.spacing(1),
        // borderLeft :  "6px solid red"
    },
    high: {
        borderLeft: `6px solid ${[red[500]]}`,
    },
    medium: {
        borderLeft: `6px solid ${orange[500]}`,
    },
    low: {
        borderLeft: `6px solid ${yellow[500]}`,
    },
    inactive: {
        borderLeft: `6px solid ${grey[500]}`,
    },
    complete: {
        borderLeft: `16px solid ${green[500]}`,
    },
}));

type Props = {
    story: Story;
};

const StoryBox: React.FC<Props> = ({ story }: Props) => {
    const classes = useStyles();

    const openStoryDeleteModal = (id: string) => {
        console.log('openStoryDeleteModal', id);
    };
    const onUpdateTaskHandler = () => {
        console.log('onUpdateTaskHandler');
    };
    const onCompleteTaskHandler = () => {
        console.log('onCompleteTaskHandler');
    };
    const onStatusChangedHandler = () => {
        console.log('onStatusChangedHandler');
    };
    return (
        <Card
            raised
            className={clsx(classes.taskBox, {
                [classes.medium]: story.status === StoryStatus.ACTIVE && story.critical === StoryCritical.MEDIUM,
                [classes.high]: story.status === StoryStatus.ACTIVE && story.critical === StoryCritical.HIGH,
                [classes.low]: story.status === StoryStatus.ACTIVE && story.critical === StoryCritical.LOW,
                [classes.inactive]: story.status === StoryStatus.INACTIVE,
                [classes.complete]: story.status === StoryStatus.COMPLETE,
            })}
        >
            <CardContent>
                <Grid container alignItems="stretch">
                    <Grid item xs={11}>
                        <Typography variant="body1"> {story.content}</Typography>
                        <Typography variant="body2">
                            <strong>{story.technology}</strong>
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                {story.status !== StoryStatus.COMPLETE ? (
                                    <Switch
                                        checked={story.status === StoryStatus.ACTIVE ? true : false}
                                        onChange={onStatusChangedHandler}
                                        color="primary"
                                        name="status"
                                    />
                                ) : null}

                                {story.status === StoryStatus.ACTIVE ? (
                                    <IconButton
                                        size="small"
                                        color="inherit"
                                        aria-label="complete task"
                                        onClick={onCompleteTaskHandler}
                                    >
                                        <DoneIcon />
                                    </IconButton>
                                ) : null}
                            </Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Grid
                            container
                            style={{ height: '100%' }}
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                        >
                            <IconButton
                                size="small"
                                color="inherit"
                                aria-label="delete task"
                                onClick={() => openStoryDeleteModal(story._id)}
                            >
                                <DeleteIcon />
                            </IconButton>

                            <IconButton
                                size="small"
                                color="inherit"
                                aria-label="update task"
                                onClick={onUpdateTaskHandler}
                            >
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default StoryBox;
