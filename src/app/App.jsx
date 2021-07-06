import React from "react";
import toast from "toastr";
import { Switch } from "react-router";
import Route from "react-router-hooks";
import {
  createNetworkStatusNotifier
} from "react-apollo-network-status";
import { ApolloClient, HttpLink, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import { 
  Steps, 
  ListTests, 
  ActiveTests, 
  Home,
  HomePage,
  AboutPage,
  DocumentationPage,
  LoginForGame,
  FinishTable,
  Game,
  EditTest
} from './components';

import { GlobalStyle, LinearProgress } from "./styles";

import { CustomThemeProvider } from './CustomThemeProvider';

const { useApolloNetworkStatus } = createNetworkStatusNotifier();

function GlobalLoadingIndicator() {
  const status = useApolloNetworkStatus();

  if (status.mutationError && status.mutationError.graphQLErrors) {
    const mutationErrors = status.mutationError.graphQLErrors;

    mutationErrors.forEach(mutation => {
      toast.warning(mutation.message);
    });

    return null;
  }

  if (status.mutationError && status.mutationError.networkError) {
    const networkError = status.mutationError.networkError;

    toast.warning(networkError.message);

    return null;
  }

  if (status.numPendingQueries > 0 || status.numPendingMutations > 0) {
    return <LinearProgress value={100} />;
  }

  return null;
}

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
  cache: new InMemoryCache(),
});

export const App = () => (
  <CustomThemeProvider>
    <CssBaseline />
    <ApolloProvider client={apolloClient}>
      {/* <ApolloNetworkStatusProvider> */}
        <GlobalLoadingIndicator />
        <BrowserRouter>
          <Home>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/create" component={Steps} />
              <Route exact path="/tests" component={ListTests} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/tests/:UUID" component={EditTest} />
              <Route exact path="/activetests" component={ActiveTests} />
              <Route exact path="/activetests/:CODE" component={LoginForGame} />
              <Route
                exact
                path="/documentation"
                component={DocumentationPage}
              />
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
      {/* </ApolloNetworkStatusProvider> */}
    </ApolloProvider>
  </CustomThemeProvider>
);
