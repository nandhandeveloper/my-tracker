import React from 'react';
import { Story } from '../../models/Story';
import { Grid, makeStyles } from '@material-ui/core';
import StoryBox from '../StoryBox/StoryBox';
import NoRecordsFound from '../NoRecordsFound/NoRecordsFound';

const useStyles = makeStyles((theme) => ({
    storiesListBox: {
        padding: theme.spacing(1),
    },
    noStroiesBox: {
        marginTop: theme.spacing(8),
    }
}));

type Props = {
    stories: Story[];
};

const StoryList: React.FC<Props> = ({ stories }: Props) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="center" alignItems="stretch" className={classes.storiesListBox}>
            {stories.length > 0 ? (
                stories.map((story: Story) => <StoryBox key={story._id} story={story}></StoryBox>)
            ) : (
                <NoRecordsFound text="No Stories are found! Please add a Story (or) Select a different Project" />
            )}
        </Grid>
    );
};

export default StoryList;
