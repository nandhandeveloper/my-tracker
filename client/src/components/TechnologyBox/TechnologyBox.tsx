import React from 'react';
import { Techstack } from '../../models/Techstack';

import { Typography, Paper, makeStyles, List } from '@material-ui/core';

import TechnologyContent from '../TechnologyContent/TechnologyContent';

type Props = {
    content: Techstack[];
    title: string;
};

const useStyles = makeStyles((theme) => ({
    techBox: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },
    techTitle: {
        fontWeight: 'bold',
        fontSize: theme.spacing(3),
    },
}));

const TechnologyBox: React.FC<Props> = ({ title, content }: Props): React.ReactElement => {
    const classes = useStyles();
    return (
        <Paper className={classes.techBox} elevation={1}>
            <Typography variant="h4" color="primary" className={classes.techTitle}>
                {title}
            </Typography>
            <List>
                {content.map((techObj: Techstack, index: number) => (
                    <TechnologyContent key={index} techObj={techObj} />
                ))}
            </List>
        </Paper>
    );
};

export default TechnologyBox;
