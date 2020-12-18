import React, { useEffect, useCallback } from 'react';

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
import NoRecordsFound from '../../components/NoRecordsFound/NoRecordsFound';
import ProjectActionsModal from '../../components/ProjectActionsModal/ProjectActionsModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';

const Projects: React.FC<Record<string, never>> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        commonRed: { isProjectAddModalOpen: addModalState },
        projectsRed: { projects, isLoading, selectedProject, isActionsModalOpen, isDeleteConfirmModalOpen },
    } = useSelector((state: RootState) => state);

    const pageName = history.location.pathname.slice(1);

    const getAllProjects = useCallback(() => dispatch(actions.getAllProjects()), [dispatch]);
    const toggleAddProjectModal = () => dispatch(actions.toggleAddModal(pageName));
    const toggleActionsModal = () => dispatch(actions.onActionsModalToggle());
    const toggleProjectDeleteConfirmModal = () => dispatch(actions.onDeleteConfirmModalToggle());

    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);

    return (
        <BasicLayout>
            <PageTitle title="Projects" />

            {isLoading ? (
                <FullScreenSpinner color={SPINNERCOLOR.SECONDARY} text="Fetching Products" />
            ) : (
                projects &&
                (projects?.length > 0 ? (
                    <ProjectListBox projects={projects} />
                ) : (
                    <NoRecordsFound text="No Projects are found" />
                ))
            )}

            <AddModal title="New Project" isOpen={addModalState} onToggleModal={() => toggleAddProjectModal()}>
                <AddProjectForm />
            </AddModal>
            <ProjectActionsModal
                isOpen={isActionsModalOpen}
                onCloseModal={() => toggleActionsModal()}
                project={selectedProject}
                onEditHandler={() => {
                    toggleActionsModal();
                    toggleAddProjectModal();
                }}
                onDeleteHandler={() => {
                    toggleActionsModal();
                    toggleProjectDeleteConfirmModal();
                }}
            />
            <DeleteConfirmModal
                isOpen={isDeleteConfirmModalOpen}
                type="project"
                onCloseModal={() => toggleProjectDeleteConfirmModal()}
            />
        </BasicLayout>
    );
};

export default Projects;
