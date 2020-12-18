import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddModal from '../../components/AddModal/AddModal';
import BasicLayout from '../../components/BasicLayout/BasicLayout';
import PageTitle from '../../components/PageTitle/PageTitle';
import { RootState } from '../../store';
import { toggleAddModal } from '../../store/actions/actionCreators';
import { useHistory } from 'react-router-dom';
import AddStoryForm from '../../components/AddStoryForm/AddStoryForm';
import StroyStatusBox from '../../components/StroyStatusBox/StroyStatusBox';
import StoryList from '../../components/StoryList/StoryList';
import FullScreenSpinner from '../../components/FullScreenSpinner/FullScreenSpinner';
import { SPINNERCOLOR } from '../../components/Spinner/Spinner';

const Stories: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        commonRed: { isStoriesAddModalOpen },
        storiesRed: { stories, isLoading },
    } = useSelector((state: RootState) => state);
    const pageName = history.location.pathname.slice(1);

    return (
        <BasicLayout>
            <PageTitle title="Stories" />
            <StroyStatusBox />

            {isLoading ? (
                <FullScreenSpinner color={SPINNERCOLOR.SECONDARY} text="Fetching Stories" />
            ) : (
                <StoryList stories={stories || []} />
            )}
            <AddModal
                title="New Story"
                isOpen={isStoriesAddModalOpen}
                onToggleModal={() => dispatch(toggleAddModal(pageName))}
            >
                <AddStoryForm />
            </AddModal>
        </BasicLayout>
    );
};

export default Stories;
