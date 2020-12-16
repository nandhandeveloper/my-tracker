import React from 'react';

import { CircularProgress, Typography } from '@material-ui/core';

export enum SPINNERCOLOR {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INHERIT = 'inherit',
}

type Props = {
    color: SPINNERCOLOR;
    text: string;
};

const Spinner: React.FC<Props> = ({ color, text }: Props) => {
    return (
        <>
            <CircularProgress color={color || 'primary'} />
            <Typography variant="body1">{text}</Typography>
        </>
    );
};

export default Spinner;
