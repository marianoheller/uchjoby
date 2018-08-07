import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Landing from './containers/Landing';
import Practice from './containers/Practice';
import Navbar from './components/Navbar';
import * as wordsActions from './actions/words';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: hurme_no2-webfont, -apple-system, BlinkMacSystemFont, sans-serif;
  color: ${({ theme }) => theme.palette.background.secondary};
  background-color: ${({ theme }) => theme.palette.background.secondary};
`;

class App extends Component {
  componentDidMount() {
    const { getWord } = this.props;
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    getWord();
  }

  _handleKeyDown(e) {
    if (e.keyCode === 39 ) { // Arrow right
      this.props.nextCard();
    }
    if (e.keyCode === 37 ) { // Arrow left
      this.props.previousCard();
    }
  }

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


const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  getWord: () => dispatch(wordsActions.getWords.request(1)),
  nextCard: () => dispatch(wordsActions.nextWordIndex()),
  previousCard: () => dispatch(wordsActions.previousWordIndex()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

