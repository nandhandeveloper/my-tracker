import React from 'react';
import { Project } from '../../models/Project';
import ProjectBox from '../ProjectBox/ProjectBox';
import {  Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    statusBox: {
        marginBottom: theme.spacing(4),
    },
}));

type Props = {
    status: string;
    projects: Project[];
};
const ProjectStatusBox: React.FC<Props> = ({ projects }: Props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.statusBox}>
            <Grid item xs={12} container>
                {projects.map((project: Project, index: number) => (
                    <ProjectBox key={index} project={project} />
                ))}
            </Grid>
        </Grid>
    );
};
export default ProjectStatusBox;
