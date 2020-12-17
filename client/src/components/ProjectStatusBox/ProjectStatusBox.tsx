import React from 'react';
import { Project } from '../../models/Project';
import ProjectBox from '../ProjectBox/ProjectBox';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    statusBox: {
        marginBottom: theme.spacing(2),
    },
}));


type Props = {
    status: string;
    projects: Project[];
};
const ProjectStatusBox: React.FC<Props> = ({ status, projects }: Props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.statusBox}>
            <Grid xs={12} item>
                <Typography variant="h5">{status}</Typography>
            </Grid>
            {projects.map((project: Project, index: number) => (
                <ProjectBox key={index} project={project} />
            ))}
        </Grid>
    );
};
export default ProjectStatusBox;
