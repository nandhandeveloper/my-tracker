import React, { useEffect, useCallback } from 'react';
// import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import BasicLayout from '../../components/BasicLayout/BasicLayout';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProjectListBox from '../../components/ProjectListBox/ProjectListBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AddModal from '../../components/AddModal/AddModal';
import AddProjectForm from '../../components/AddProjectForm/AddProjectForm';
import * as actions from '../../store/actions/actionCreators';
import { SPINNERCOLOR } from '../../components/Spinner/Spinner';
import FullScreenSpinner from '../../components/FullScreenSpinner/FullScreenSpinner';

const Projects: React.FC<Record<string, never>> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        commonRed: { isProjectAddModalOpen: addModalState },
        projectsRed: { projects, isLoading },
    } = useSelector((state: RootState) => state);

    const pageName = history.location.pathname.slice(1);

    const getAllProjects = useCallback(() => dispatch(actions.getAllProjects()), [dispatch]);
    const toggleAddModal = () => dispatch(actions.toggleAddModal(pageName));

    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);
    return (
        <BasicLayout>
            <PageTitle title="Projects" />

            {isLoading ? (
                <FullScreenSpinner color={SPINNERCOLOR.SECONDARY} text="Fetching products" />
            ) : (
                <ProjectListBox projects={projects}></ProjectListBox>
            )}

            <AddModal title="New Project" isOpen={addModalState} onToggleModal={() => toggleAddModal()}>
                <AddProjectForm />
            </AddModal>
        </BasicLayout>
    );
};

export default Projects;
