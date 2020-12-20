import React, { Suspense } from 'react';
import { NAV_ITEMS } from './common/constants';
import Header from './components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider, createMuiTheme, Paper } from '@material-ui/core';

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
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0}>
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
                        <Redirect to="/projects" />
                    </Switch>
                </Suspense>
            </Paper>
        </ThemeProvider>
    );
};

export default App;
