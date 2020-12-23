import React, { Suspense, useCallback, useEffect } from 'react';
import { NAV_ITEMS } from './common/constants';
import Header from './components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider, createMuiTheme, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from './store/actions/actionCreators';
import { SPINNERCOLOR } from './components/Spinner/Spinner';
import FullScreenSpinner from './components/FullScreenSpinner/FullScreenSpinner';
import { RootState } from './store';

type Props = {
    children?: React.ReactNode;
};

const Stories = React.lazy(() => import('./pages/Stories/Stories'));
const Projects = React.lazy(() => import('./pages/Projects/Projects'));
const TechStack = React.lazy(() => import('./pages/TechStack/TechStack'));

const theme = createMuiTheme({
    palette: {
        // type: darkmode ? "dark" : "light",
        // primary: amber,
        // secondary: green
    },
    overrides: {
        // MuiStepLabel: {
        //   root: {
        //     width: "100%"
        //   }
        // }
    },
});

const App: React.FC<Props> = () => {
    const dispatch = useDispatch();

    const {
        commonRed: { isLoading },
    } = useSelector((state: RootState) => state);

    const onInitialLoadData = useCallback(() => dispatch(actions.onInitialLoadData()), [dispatch]);

    useEffect(() => {
        onInitialLoadData();
    }, [onInitialLoadData]);
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0}>
                {isLoading ? (
                    <FullScreenSpinner color={SPINNERCOLOR.SECONDARY} text="Loading data..." />
                ) : (
                    <>
                        <Header appName="Story Tracker" navItems={NAV_ITEMS}></Header>
                        <Suspense
                            fallback={
                                <div style={{ width: '100%' }}>
                                    <p style={{ textAlign: 'center' }}>Loading.....</p>
                                </div>
                            }
                        >
                            <Switch>
                                <Route path="/stories" exact component={Stories} />
                                <Route path="/projects" exact component={Projects} />
                                <Route path="/techstack" exact component={TechStack} />
                                <Redirect to="/stories" />
                            </Switch>
                        </Suspense>
                    </>
                )}
            </Paper>
        </ThemeProvider>
    );
};

export default App;
