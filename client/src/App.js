import React, { Component } from 'react';
import styled from 'styled-components';

import Landing from './containers/Landing';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: hurme_no2-webfont, -apple-system, BlinkMacSystemFont, sans-serif;
  color: #455358;
  background-color: ${({ theme }) => theme.palette.background.secondary};
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Landing />
      </AppContainer>
    );
  }
}

export default App;
