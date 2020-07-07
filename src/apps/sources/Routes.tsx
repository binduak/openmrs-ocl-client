import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "../../components/Header";
import { ViewPersonalSourcesPage } from "./pages";
import { DICTIONARY_VERSION_CONTAINER } from "../concepts";
import ConceptRoutes from "../concepts/Routes";

interface Props {
  viewSources?: boolean;
  viewSource?: boolean;
}

const Routes: React.FC<Props> = ({ viewSources = true, viewSource = true }) => {
  // @ts-ignore
  let { path } = useRouteMatch();

  return (
    <Switch>
      {!viewSources ? null : (
        // see to do at the top of ViewPersonalDictionariesPage
        <Route exact path={`${path}/`}>
          <ViewPersonalSourcesPage />
        </Route>
      )}
    </Switch>
  );
};

export default Routes;
