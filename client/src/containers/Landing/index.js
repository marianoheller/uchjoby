import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Flashcard from '../../components/Flashcard';

import * as wordActions from '../../actions/word';

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


const mapStateToProps = ({ word }) => ({
  errors: word.errors,
  isFetching: word.isFetching,
  data: word.data,
});


const mapDispatchToProps = dispatch => ({
  getWord: () => dispatch(wordActions.getWord.request()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
