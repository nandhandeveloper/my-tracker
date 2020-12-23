import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddModal from '../../components/AddModal/AddModal';
import BasicLayout from '../../components/BasicLayout/BasicLayout';
import PageTitle from '../../components/PageTitle/PageTitle';
import { RootState } from '../../store';
import { toggleAddModal } from '../../store/actions/actionCreators';
import { useHistory } from 'react-router-dom';
import AddStoryForm from '../../components/AddStoryForm/AddStoryForm';
import StoryList from '../../components/StoryList/StoryList';
import FullScreenSpinner from '../../components/FullScreenSpinner/FullScreenSpinner';
import { SPINNERCOLOR } from '../../components/Spinner/Spinner';

import * as actions from './../../store/actions/actionCreators';
import StoryDeleteConfirmModal from '../../components/StoryDeleteConfirmModal/StoryDeleteConfirmModal';
import { STORIES_STATUS } from '../../common/constants';
import StatusesList from '../../components/StatusesList/StatusesList';
import NoRecordsFound from '../../components/NoRecordsFound/NoRecordsFound';

const storiesStatusList = STORIES_STATUS;

const Stories: React.FC<Record<string, never>> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        commonRed: { isStoriesAddModalOpen },
        storiesRed: { stories, isLoading, isDeleteConfirmModalOpen },
        projectsRed: { selectedProjectTracking },
    } = useSelector((state: RootState) => state);

    const onLoadStories = useCallback((projectId) => dispatch(actions.getAllStories(projectId)), [dispatch]);
    const onToggleDeleteModal = () => dispatch(actions.onDeleteStoryConfirmModalToggle());

    const pageName = history.location.pathname.slice(1);
    useEffect(() => {
        if (selectedProjectTracking) {
            onLoadStories(selectedProjectTracking?._id);
        }
    }, [onLoadStories, selectedProjectTracking]);

    return (
        <BasicLayout>
            <PageTitle title="Stories" />
            <StatusesList statusList={storiesStatusList} />

            {isLoading ? (
                <FullScreenSpinner color={SPINNERCOLOR.SECONDARY} text="Fetching Stories" />
            ) : selectedProjectTracking ? (
                <StoryList stories={stories || []} />
            ) : (
                <NoRecordsFound text="Please select a Project to display Stories" />
            )}
            <AddModal
                title="New Story"
                isOpen={isStoriesAddModalOpen}
                onToggleModal={() => dispatch(toggleAddModal(pageName))}
            >
                <AddStoryForm />
            </AddModal>
            <StoryDeleteConfirmModal
                isDialogOpen={isDeleteConfirmModalOpen}
                onToggleDeleteModal={onToggleDeleteModal}
            />
        </BasicLayout>
    );
};

export default Stories;
