import React from 'react';

import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Techstack } from '../../models/Techstack';

type Props = {
    techObj: Techstack;
};

const TechnologyContent: React.FC<Props> = ({ techObj }: Props): React.ReactElement => {
    return (
        <ListItem>
            <ListItemIcon>
                <CheckCircleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={techObj.description}></ListItemText>
        </ListItem>
    );
};

export default TechnologyContent;
