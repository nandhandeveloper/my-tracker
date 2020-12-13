import React, { useState, useEffect } from 'react';
import { NavItem } from '../../models/NavItem';
import { useHistory } from 'react-router-dom';

import {
    AppBar,
    Typography,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    makeStyles,
    ListItemText,
    Grid,
    ListItemIcon,
} from '@material-ui/core';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import CodeIcon from '@material-ui/icons/Code';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useDispatch } from 'react-redux';
import { toggleAddModal } from '../../store/actions/actionCreators';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: theme.spacing(32),
        padding: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(42),
        },
    },
    companyName: {
        textAlign: 'center',
        color: theme.palette.common.white,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(1),
        border: `4px solid ${theme.palette.primary.light}`,
        borderRadius: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2),
            fontSize: theme.typography.h5.fontSize,
        },
    },
    navItem: {
        padding: theme.spacing(2),
    },

    titleBox: {
        background: theme.palette.primary.main,
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4),
    },
    activeListItem: {
        borderLeft: `${theme.spacing(1)}px solid ${theme.palette.secondary.light}`,
    },
    activeNavtext: {
        color: theme.palette.secondary.light,
        '& > span': {
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    activeNavIcon: {
        color: theme.palette.secondary.light,
    },
    projectName: {
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.fontWeightBold,
    },
}));

type Props = {
    appName: string;
    navItems: NavItem[];
};

const Header: React.FC<Props> = ({ appName, navItems }: Props): React.ReactElement => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const [activeRoute, setActiveRoute] = useState<string>('/projects');
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        setActiveRoute(history.location.pathname);
    }, [history.location.pathname]);

    const getListItemIcon = (name: string) => {
        switch (name) {
            case 'Stories':
                return <AssignmentIcon />;
            case 'Projects':
                return <AccountTreeIcon />;
            case 'Technology Stack':
                return <CodeIcon />;
        }
    };

    const onToggleDrawerHandler = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const onOpenAddModel = () => {
        dispatch(toggleAddModal(activeRoute.slice(1)));
    };

    const onNavItemSelectionHandler = (to: string) => {
        history.push(to);
        onToggleDrawerHandler();
    };

    return (
        <>
            <AppBar title={appName}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={onToggleDrawerHandler}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8} container justify="center" alignItems="center">
                            <Typography className={classes.projectName}>Project Name</Typography>
                        </Grid>
                        <Grid item xs={2} container justify="flex-end">
                            <IconButton edge="end" color="inherit" aria-label="add" onClick={onOpenAddModel}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer open={isDrawerOpen} onClose={onToggleDrawerHandler}>
                <List className={classes.drawer}>
                    <ListItem className={classes.titleBox} key="My Tracker" divider>
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={12}>
                                <Typography className={classes.companyName}>My Tracker</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    {navItems.map(({ name, to }, index) => (
                        <ListItem
                            className={clsx(classes.navItem, {
                                [classes.activeListItem]: to === activeRoute,
                            })}
                            key={index}
                            onClick={() => onNavItemSelectionHandler(to)}
                            button
                            divider
                        >
                            <ListItemIcon className={clsx({ [classes.activeNavIcon]: to === activeRoute })}>
                                {getListItemIcon(name)}
                            </ListItemIcon>
                            <ListItemText className={clsx({ [classes.activeNavtext]: to === activeRoute })}>
                                {name}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
