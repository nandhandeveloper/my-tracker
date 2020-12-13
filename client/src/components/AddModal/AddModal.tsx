import React from 'react';

import { AppBar, Dialog, Grid, IconButton, Slide, Toolbar, Typography, Paper, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SlideProps } from '@material-ui/core/Slide/Slide';
import BasicLayout from '../BasicLayout/BasicLayout';

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    formBox: {
        padding: theme.spacing(1),
    },
}));

type props = {
    isOpen: boolean;
    title: string;
    onToggleModal: () => void;
};
const AddModal: React.FC<props> = ({ children, isOpen, title, onToggleModal }) => {
    const classes = useStyles();
    return (
        <Dialog fullScreen open={isOpen} onClose={onToggleModal} TransitionComponent={Transition}>
            <AppBar color="secondary">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} container justify="center" alignItems="center">
                            <Typography variant="h6">{title}</Typography>
                        </Grid>
                        <Grid item xs={2} onClick={onToggleModal} container justify="flex-end" alignItems="center">
                            <IconButton edge="end" color="inherit" aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <BasicLayout>
                <Paper elevation={0} className={classes.formBox}>
                    {children}
                </Paper>
            </BasicLayout>
        </Dialog>
    );
};

export default AddModal;
