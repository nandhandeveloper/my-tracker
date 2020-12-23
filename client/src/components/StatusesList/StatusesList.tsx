import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { green, grey, orange, red, yellow } from '@material-ui/core/colors';
import clsx from 'clsx';
import { Status } from '../../models/Status';

const useStyles = makeStyles((theme) => ({
    statusList: {
        marginBottom: theme.spacing(4),
    },
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

type Props = {
    statusList: string[];
};

const StatusesList: React.FC<Props> = ({ statusList }: Props) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} container justify="space-around" className={classes.statusList}>
            {statusList.map((status) => {
                return (
                    <Grid item key={status}>
                        <Grid container justify="center" alignItems="center">
                            <div
                                className={clsx({
                                    [classes.greenColorBox]: status === Status.ACTIVE || status === Status.COMPLETE,
                                    [classes.inactiveColorBox]: status === Status.INACTIVE,
                                    [classes.orangeColorBox]: status === Status.MEDIUM,
                                    [classes.redColorBox]: status === Status.HIGH,
                                    [classes.yellowColorBox]: status === Status.LOW || status === Status.ONHOLD,
                                })}
                            ></div>
                            <div>{status.toUpperCase()}</div>
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default StatusesList;
