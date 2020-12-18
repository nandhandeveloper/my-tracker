import React, { ReactNode } from 'react';

import { AppBar, Dialog, Grid, IconButton, Slide, Toolbar, Typography, Paper, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SlideProps } from '@material-ui/core/Slide/Slide';
import BasicLayout from '../BasicLayout/BasicLayout';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/actions/actionCreators';

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    formBox: {
        padding: theme.spacing(1),
    },
}));

type Props = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onToggleModal: () => void;
};
const AddModal: React.FC<Props> = ({ children, isOpen, title, onToggleModal }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onProjectSelected = () => dispatch(actions.onProjectSelected(undefined));

    const onCloseAddModal = () => {
        onToggleModal();
        onProjectSelected();
    };
    return (
        <Dialog fullScreen open={isOpen} onClose={onToggleModal} TransitionComponent={Transition}>
            <AppBar color="secondary">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} container justify="center" alignItems="center">
                            <Typography variant="h6">{title}</Typography>
                        </Grid>
                        <Grid item xs={2} onClick={onCloseAddModal} container justify="flex-end" alignItems="center">
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
