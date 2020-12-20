import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Story } from '../../models/Story';
import { RootState } from '../../store';

import * as actions from './../../store/actions/actionCreators';
type Props = {
    isDialogOpen: boolean;
    onToggleDeleteModal: () => void;
};
const StoryDeleteConfirmModal: React.FC<Props> = ({ isDialogOpen, onToggleDeleteModal }: Props) => {
    const dispatch = useDispatch();
    const {
        storiesRed: { selectedStory },
    } = useSelector((state: RootState) => state);

    const onDeleteStory = (story: Story) => dispatch(actions.onDeleteStory(story));
    const onStorySelected = () => dispatch(actions.onStorySelected(undefined));

    const onCloseDeleteStoryModal = () => {
        onStorySelected();
        onToggleDeleteModal();
    };

    const onDeleteStoryHandler = () => {
        onStorySelected();
        onDeleteStory(selectedStory!);
    };

    return (
        <Dialog open={isDialogOpen} onClose={onCloseDeleteStoryModal}>
            <DialogTitle id="delete-modal-heading">Delete Story Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-modal-description">
                    Please confirm to Delete the Story. This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDeleteStoryModal} color="primary">
                    Disagree
                </Button>
                <Button onClick={() => onDeleteStoryHandler()} color="primary">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StoryDeleteConfirmModal;
