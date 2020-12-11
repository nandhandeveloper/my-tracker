import { Paper, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

type Props = {
    title: string
};

const useStyles = makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 'bold',
        fontSize: theme.spacing(3),
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.spacing(4),
        },
    },
}));

const PageTitle: React.FC<Props> = ({title}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0}>
            <Typography className={classes.pageTitle} variant="h1" color="secondary" align="center" gutterBottom>
                {title}
            </Typography>
        </Paper>
    );
};

export default PageTitle;
