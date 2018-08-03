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
  overflow: hidden;
`;

const FlashcardContainer = styled.div`
  max-width: 600px;
  width: 90%;
  height: 90%;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right:  0.5rem;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.palette.primary };
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
  height: 2rem;
  width: 2rem;
  margin-top: 1rem;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 50%;

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
    const {
      data,
      wordsStatus,
      translationsStatus,
      infosStatus,
    } = this.props;
    return (
      <PracticeContainer>
        <FlashcardContainer>
          <Flashcard
            data={data}
            status={{
              word: wordsStatus,
              translation: translationsStatus,
              info: infosStatus,
            }}
          />          
        </FlashcardContainer>
        <Button>
          >
        </Button>
      </PracticeContainer>
    )
  }
}


const mapStateToProps = ({ words }) => ({
  data: words.arrData[words.currentIndex],
  wordsStatus: words.wordsStatus,
  translationsStatus: words.translationsStatus,
  infosStatus: words.infosStatus,
});


const mapDispatchToProps = dispatch => ({
  getWord: () => dispatch(wordsActions.getWords.request(1)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Practice);
