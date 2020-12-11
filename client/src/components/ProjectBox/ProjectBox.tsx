import React from 'react';

import { Project } from '../../models/Project';
import { Card, CardHeader } from '@material-ui/core';

type Props = {
    project: Project;
};
const ProjectBox: React.FC<Props> = ({ project: { name, status } }) => {
    return (
        <Card>
            <CardHeader title={name} subheader={status} />
        </Card>
    );
};

export default ProjectBox;
