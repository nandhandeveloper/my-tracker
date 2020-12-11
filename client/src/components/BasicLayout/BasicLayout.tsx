import React from 'react';
import { Grid,Paper, makeStyles } from '@material-ui/core';

type Props = {
    children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
    layout: {
        paddingTop: theme.spacing(8),
        [theme.breakpoints.up('xs')]: {
            paddingTop: theme.spacing(10),
        },
    },
}));

const BasicLayout: React.FC<Props> = ({ children }: Props) => {
    const classes = useStyles();
    return (
        <Paper elevation={0}>
            <Grid className={classes.layout}>{children}</Grid>
        </Paper>
    );
};

export default BasicLayout;
