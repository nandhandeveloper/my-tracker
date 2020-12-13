import React, { useState } from 'react';
import BasicLayout from '../../components/BasicLayout/BasicLayout';

import PageTitle from '../../components/PageTitle/PageTitle';
import { Project } from '../../models/Project';
import { PROJECTS } from '../../common/constants';
import ProjectListBox from '../../components/ProjectListBox/ProjectListBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleAddModal } from '../../store/actions/common/actions';
import AddModal from '../../components/AddModal/AddModal';

import { useHistory } from 'react-router-dom';
import AddProjectForm from '../../components/AddProjectForm/AddProjectForm';

const initialState: Project[] = PROJECTS;

const Projects: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [projectList] = useState<Project[]>(initialState);
    const addModalState = useSelector((state: RootState) => state.commonRed.isProjectAddModalOpen);
    const pageName = history.location.pathname.slice(1);
    return (
        <BasicLayout>
            <PageTitle title="Projects" />
            <ProjectListBox projects={projectList}></ProjectListBox>
            <AddModal
                title="New Project"
                isOpen={addModalState}
                onToggleModal={() => dispatch(toggleAddModal(pageName))}
            >
                <AddProjectForm />
            </AddModal>
        </BasicLayout>
    );
};

export default Projects;
