import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {ViewSourcePage} from "./pages";
import EditSourcePage from "./pages/EditSourcePage";

interface Props {
    viewSource?: boolean;
    editSource?: boolean;
}

const Routes: React.FC<Props> = ({
     viewSource = true,
     editSource = true
                                 }) => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            {!viewSource ? null : (
                <Route exact path={`${path}/:source/`}>
                    <ViewSourcePage />
                </Route>
            )}
            {!editSource ? null : (
                <Route exact path={`${path}/:source/edit/`}>
                    <EditSourcePage />
                </Route>
            )}
        </Switch>
    );
};

export default Routes;
