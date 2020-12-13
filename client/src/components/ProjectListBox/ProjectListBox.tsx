import React from 'react';
import { Project } from '../../models/Project';
import { makeStyles, Paper } from '@material-ui/core';
import ProjectStatusBox from '../ProjectStatusBox/ProjectStatusBox';

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
    const projectListMap: { [key: string]: Project[] } = {};

    const groupProjectList = () => {
        projects.forEach((project) => {
            if (projectListMap[project.status]) {
                const newList = [...projectListMap[project.status]];
                newList.push(project);
                projectListMap[project.status] = newList;
            } else {
                projectListMap[project.status] = [];
                projectListMap[project.status].push(project);
            }
        });
        return projectListMap;
    };
    return (
        <Paper className={classes.projectBox} elevation={0}>
            {Object.keys(groupProjectList()).map((status) => (
                <ProjectStatusBox key={status} status={status}  projects={projectListMap[status]} />
            ))}
        </Paper>
    );
};

export default ProjectListBox;
