import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import { green, grey, orange, red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    redColorBox: {
        height: '10px',
        width: '10px',
        backgroundColor: red[500],
        marginRight: theme.spacing(1),
    },
    orangeColorBox: {
        height: '10px',
        width: '10px',
        backgroundColor: orange[500],
        marginRight: theme.spacing(1),
    },
    greenColorBox: {
        height: '10px',
        width: '10px',
        backgroundColor: green[500],
        marginRight: theme.spacing(1),
    },
    yellowColorBox: {
        height: '10px',
        width: '10px',
        backgroundColor: yellow[500],
        marginRight: theme.spacing(1),
    },
    inactiveColorBox: {
        height: '10px',
        width: '10px',
        backgroundColor: grey[500],
        marginRight: theme.spacing(1),
    },
}));

const StroyStatusBox: React.FC<Record<string, never>> = () => {
    const classes = useStyles();

    return (
        <Grid item xs={12} container justify="space-around">
            <Grid item>
                <Grid container justify="center" alignItems="center">
                    <div className={classes.redColorBox}></div>
                    <div>HIGH</div>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container justify="center" alignItems="center">
                    <div className={classes.orangeColorBox}></div>
                    <div>MEDIUM</div>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container justify="center" alignItems="center">
                    <div className={classes.yellowColorBox}></div>
                    <div>LOW</div>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container justify="center" alignItems="center">
                    <div className={classes.greenColorBox}></div>
                    <div>COMPLETE</div>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container justify="center" alignItems="center">
                    <div className={classes.inactiveColorBox}></div>
                    <div>INACTIVE</div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StroyStatusBox;
