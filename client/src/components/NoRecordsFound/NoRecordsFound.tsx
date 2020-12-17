import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    noRecords: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(2),
    },
    errorText: {
        fontWeight: 'bold',
    },
}));

type Props = {
    text: string;
};

const NoRecordsFound: React.FC<Props> = ({ text }: Props) => {
    const classes = useStyles();
    return (
        <Grid className={classes.noRecords} container justify="center" alignItems="center">
            <Grid item xs={12}>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    <Typography variant="h6" align="center" className={classes.errorText}>
                        {text}
                    </Typography>
                </Alert>
            </Grid>
        </Grid>
    );
};

export default NoRecordsFound;
