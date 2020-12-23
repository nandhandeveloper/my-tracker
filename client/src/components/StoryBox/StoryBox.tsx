import React from 'react';
import { Story, StoryCritical, StoryStatus } from '../../models/Story';

import { Box, Card, CardContent, Grid, IconButton, makeStyles, Switch, Typography } from '@material-ui/core';
import { green, grey, orange, red, yellow } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

import * as actions from './../../store/actions/actionCreators';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';

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
        borderLeft: `6px solid ${green[500]}`,
    },
    noColor: {
        color: 'transparent',
        background: 'transparent',
        cursor: 'default',
    },
    storyTech: {
        background: theme.palette.info.light,
        color: theme.palette.common.white,
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
    },
    leftMargin: {
        marginLeft: theme.spacing(2),
    },
}));

type Props = {
    story: Story;
};

const StoryBox: React.FC<Props> = ({ story }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const pageName = history.location.pathname.slice(1);

    const onToggleStoryDeleteModal = () => dispatch(actions.onDeleteStoryConfirmModalToggle());
    const onStorySelected = (selectedStory: Story) => dispatch(actions.onStorySelected(selectedStory));
    const onStorySaveModalToggle = () => dispatch(actions.toggleAddModal(pageName));
    const onEditStory = (editStory: Story, storyId: string) =>
        dispatch(actions.onModifyStory(editStory, storyId, false));

    const onDeleteStoryHandler = () => {
        onStorySelected(story);
        onToggleStoryDeleteModal();
    };
    const onUpdateTaskHandler = () => {
        onStorySelected(story);
        onStorySaveModalToggle();
    };
    const onCompleteTaskHandler = () => {
        const modifiedStory = { ...story };
        modifiedStory.status = StoryStatus.COMPLETE;
        onEditStory(modifiedStory, modifiedStory._id);
    };
    const onStatusChangedHandler = () => {
        const modifiedStory = { ...story };
        modifiedStory.status = story.status === StoryStatus.ACTIVE ? StoryStatus.INACTIVE : StoryStatus.ACTIVE;
        onEditStory(modifiedStory, modifiedStory._id);
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
                <Grid container justify="space-between">
                    <Grid item xs={11} container>
                        <Typography variant="body1"> {story.content}</Typography>

                        <Grid item xs={12} container justify="flex-start" alignItems="center">
                            <Grid item>
                                <Typography variant="body1" color="secondary">
                                    <strong>{story.type.toUpperCase()}</strong>
                                </Typography>
                            </Grid>
                            <Grid item className={classes.leftMargin}>
                                <Box mb={1} mt={1}>
                                    <Typography variant="body2">
                                        <span className={classes.storyTech}>
                                            <strong>{story.technology.toUpperCase()}</strong>
                                        </span>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={6} container>
                                <Grid item xs={6}>
                                    {story.status !== StoryStatus.COMPLETE ? (
                                        <Switch
                                            checked={story.status === StoryStatus.ACTIVE ? true : false}
                                            onChange={onStatusChangedHandler}
                                            color="primary"
                                            name="status"
                                        />
                                    ) : null}
                                </Grid>
                                <Grid item xs={6}>
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
                            </Grid>
                            <Grid item xs={6}></Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                <em>
                                    <Moment fromNow>{story.createdAt}</Moment>
                                </em>
                            </Typography>
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
                                onClick={() => onDeleteStoryHandler()}
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
