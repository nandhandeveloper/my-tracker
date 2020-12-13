import React from 'react';

import { Project } from '../../models/Project';
import { Card, CardHeader, Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    projectBox: {
        padding: theme.spacing(1),
    },
}));

type Props = {
    project: Project;
};
const ProjectBox: React.FC<Props> = ({ project: { name, status } }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={4} lg={3} className={classes.projectBox}>
            <Card >
                <CardHeader title={name} subheader={status} />
            </Card>
        </Grid>
    );
};

export default ProjectBox;
