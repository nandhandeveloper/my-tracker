import React from 'react';
import BasicLayout from '../../components/BasicLayout/BasicLayout';

import { Grid} from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';

const Stories: React.FC<{}> = () => {
    return (
        <BasicLayout>
            <Grid container>
                <Grid item xs={false} md={2}></Grid>
                <Grid item xs={12} md={8}>
                <PageTitle  title="Stories"/>
                
                </Grid>
                <Grid item xs={false} md={2}></Grid>
            </Grid>
        </BasicLayout>
    );
};

export default Stories;
