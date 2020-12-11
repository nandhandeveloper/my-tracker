import React from 'react';
import { Project } from '../../models/Project';
import { makeStyles, Paper } from '@material-ui/core';
import ProjectBox from '../ProjectBox/ProjectBox';

const useStyles = makeStyles((theme) => ({
    projectBox: {
        padding: theme.spacing(1),
    },
}));

type Props = {
    projects: Project[];
};

const ProjectListBox: React.FC<Props> = ({ projects }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.projectBox} elevation={0}>
            {projects.map((project) => (
                <ProjectBox key={project._id} project={project} />
            ))}
        </Paper>
    );
};

export default ProjectListBox;
