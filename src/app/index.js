import React from "react";
import { split } from "apollo-link";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { CssBaseline } from "@material-ui/core";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import ListTests from "./components/ListTests";
import Steps from "./components/CreateTest/Steps";
import HomePage from "./components/Home/HomePage";
import AboutPage from "./components/Home/AboutPage";
import EditTest from "./components/EditTest/EditTest";
import Game from "./components/Game/ContainerForGame";
import FinishTable from "./components/Game/FinishTable";
import LoginForGame from "./components/Game/LoginForGame";
import ListActiveTests from "./components/ListActiveTests";
import DocumentationPage from "./components/Home/DocumentationPage";

import { GlobalStyle } from "./styles";

const httpLink = new HttpLink({
  uri: "https://api-gokahoot.herokuapp.com/query"
});

const wsLink = new WebSocketLink({
  uri: "wss://api-gokahoot.herokuapp.com/query",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const App = () => (
  <>
    <CssBaseline />
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Home>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/create" component={Steps} />
            <Route exact path="/tests" component={ListTests} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/tests/:UUID" component={EditTest} />
            <Route exact path="/activetests" component={ListActiveTests} />
            <Route exact path="/activetests/:CODE" component={LoginForGame} />
            <Route exact path="/documentation" component={DocumentationPage} />
            <Route
              exact
              path="/activetests/:CODE/game/:UUID"
              component={Game}
            />
            <Route
              exact
              path="/activetests/:CODE/game/:UUID/finishtable"
              component={FinishTable}
            />
          </Switch>
          <GlobalStyle />
        </Home>
      </BrowserRouter>
    </ApolloProvider>
  </>
);

export default App;
