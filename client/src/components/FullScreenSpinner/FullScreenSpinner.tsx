import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';

import Spinner, { SPINNERCOLOR } from '../Spinner/Spinner';

const useStyles = makeStyles(() => ({
    spinner: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'transaparent',
    },
}));

type Props = {
    text: string;
    color: SPINNERCOLOR;
};

const FullScreenSpinner: React.FC<Props> = ({ color, text }: Props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.spinner} elevation={0}>
            <Spinner color={color} text={text} />
        </Paper>
    );
};
export default FullScreenSpinner;
