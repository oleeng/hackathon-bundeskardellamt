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
import { PurchasePage } from "./Components/Pages/PurchasePage/PurchasePage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/purchase">
                    <PurchasePage />
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
