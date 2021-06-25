import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from "react-router-dom";

import "./App.css";
import { LandingPage } from "./Components/Pages/LandingPage/LandingPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
