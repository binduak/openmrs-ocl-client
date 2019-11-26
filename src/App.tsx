import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {AuthenticationRequired, LoginPage} from "./apps/authentication";
import {Provider} from "react-redux";
import store from "./store";
import NavDrawer from './components/NavDrawer';
import DictionaryRoutes, { CreateDictionaryPage, ViewDictionariesPage } from './apps/dictionaries'
import ConceptRoutes, { ViewConceptsPage } from './apps/concepts'
import Header from "./components/Header";

const AuthenticatedRoutes: React.FC = () => {
    return (
      <Switch>
          <Route exact path="/dictionaries/new/">
              <Header title="Create Dictionary">
                  <CreateDictionaryPage/>
              </Header>
          </Route>
          <Route exact path="/dictionaries/">
              <Header title="Public Dictionaries">
                  <ViewDictionariesPage/>
              </Header>
          </Route>
          <Route path="/:ownerType/:owner/dictionaries" component={DictionaryRoutes}/>
          <Route path="/:ownerType/:owner/sources/:source/concepts" component={ConceptRoutes}/>
          <Route path="/:ownerType/:owner/collections/:collection/concepts/" component={ViewConceptsPage}/>
          <Route exact path="/">
              Home
          </Route>
      </Switch>
    );
};

const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/">
                    <AuthenticationRequired>
                        {() => (
                            <NavDrawer>
                                <AuthenticatedRoutes/>
                            </NavDrawer>
                        )}
                    </AuthenticationRequired>
                </Route>
            </Switch>
        </Router>
    );
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
};

export default App;
