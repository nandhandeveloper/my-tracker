import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddModal from '../../components/AddModal/AddModal';
import BasicLayout from '../../components/BasicLayout/BasicLayout';
import PageTitle from '../../components/PageTitle/PageTitle';
import { RootState } from '../../store';
import { toggleAddModal } from '../../store/actions/actionCreators';
import { useHistory } from 'react-router-dom';
import AddStoryForm from '../../components/AddStoryForm/AddStoryForm';

const Stories: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const addModalState = useSelector((state: RootState) => state.commonRed.isStoriesAddModalOpen);
    const pageName = history.location.pathname.slice(1);

    return (
        <BasicLayout>
            <PageTitle title="Stories" />
            <AddModal
                title="New Story"
                isOpen={addModalState}
                onToggleModal={() => dispatch(toggleAddModal(pageName))}
            >
                <AddStoryForm />
            </AddModal>
        </BasicLayout>
    );
};

export default Stories;
