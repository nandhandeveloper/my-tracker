import React, { useState } from 'react';
import BasicLayout from '../../components/BasicLayout/BasicLayout';

import { Grid } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Project } from '../../models/Project';
import { PROJECTS } from '../../common/constants';
import ProjectListBox from '../../components/ProjectListBox/ProjectListBox';

const initialState: Project[] = PROJECTS;

const Projects: React.FC<{}> = () => {
    const [projectList] = useState<Project[]>(initialState);
    return (
        <BasicLayout>
            <Grid container>
                <Grid item xs={false} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    <PageTitle title="Projects" />
                    <ProjectListBox projects={projectList}>

                    </ProjectListBox>
                </Grid>
                <Grid item xs={false} md={2}></Grid>
            </Grid>
        </BasicLayout>
    );
};

export default Projects;
