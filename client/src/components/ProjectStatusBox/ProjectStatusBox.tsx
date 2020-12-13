import React from 'react';
import { Project } from '../../models/Project';
import ProjectBox from '../ProjectBox/ProjectBox';
import { Typography, Grid } from '@material-ui/core';

type props = {
    status: string;
    projects: Project[];
};
const ProjectStatusBox: React.FC<props> = ({ status, projects }) => {
    return (
        <Grid container>
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
