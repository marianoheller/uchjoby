import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Flashcard from '../../components/Flashcard';

import * as wordsActions from '../../actions/words';

const LandingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Landing extends Component {
  componentDidMount() {
    const { getWord } = this.props;
    getWord();
  }

  render() {
    const data = {
      front: '',
      back: {
        pronunciation: '',
        meaning: '',
      },
    }
    return (
      <LandingContainer>
        <Flashcard
          data={data}
        />
      </LandingContainer>
    )
  }
}


const mapStateToProps = ({ words }) => ({
  errors: words.errors,
  isFetching: words.isFetching,
  data: words.data,
});


const mapDispatchToProps = dispatch => ({
  getWord: () => dispatch(wordsActions.getWords.request(1)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
