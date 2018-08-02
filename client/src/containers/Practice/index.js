import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Flashcard from '../../components/Flashcard';

import * as wordsActions from '../../actions/words';

const PracticeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlashcardContainer = styled.div`
  width: 80%;
  height: 80%;
  max-width: 600px;
  margin-top: 2rem;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.palette.primary };
  text-align: center;
  cursor: pointer;
  user-select: none;
  width: 5rem;
  height: 1.5rem;
  margin-top: 1rem;
  border-width: 1px;
  border-style: solid;
  border-color: black;

  &:hover {
    background-color: black;
    color: white;
  }
`;

class Practice extends Component {
  componentDidMount() {
    const { getWord } = this.props;
    getWord();
  }

  render() {
    const data = {
      word: '',
      translation: '',
      info: null,
    }
    return (
      <PracticeContainer>
        <FlashcardContainer>
          <Flashcard
            data={data}
          />          
        </FlashcardContainer>
        <Button>Next</Button>
      </PracticeContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(Practice);
