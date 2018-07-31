import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom'

import Landing from './containers/Landing';
import Practice from './containers/Practice';

import Navbar from './components/Navbar';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: hurme_no2-webfont, -apple-system, BlinkMacSystemFont, sans-serif;
  color: ${({ theme }) => theme.palette.background.secondary};
  background-color: ${({ theme }) => theme.palette.background.secondary};
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/*" render={() => (
            <React.Fragment>
              <Navbar />
              <Switch>
                <Route path="/practice" component={Practice}/>
                <Route path="/*" render={() => (
                  <Redirect to="/" />
                )} />
              </Switch>
            </React.Fragment>
          )}/>
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
