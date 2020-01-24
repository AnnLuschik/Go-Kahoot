import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';
import ListTests from './components/ListTests';
import Steps from './components/CreateTest/Steps';
import HomePage from './components/Home/HomePage';
import EditTest from './components/ListTests/EditTest';

const client = new ApolloClient({
  uri: 'https://api-gokahoot.herokuapp.com/query',
});

const App = () => (
  <>
    <CssBaseline />
    <ApolloProvider client={client}>
        <BrowserRouter>
          <Home>
            <Switch>
              <Route exact path='/' component={ HomePage } />
              <Route exact path='/create' component={ Steps } />
              <Route exact path='/tests' component={ ListTests } />
              <Route exact path='/tests/:UUID' component={ EditTest } />
            </Switch>
          </Home>
        </BrowserRouter>
    </ApolloProvider>
  </>
);

export default App;
