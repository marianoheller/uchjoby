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

const Buttonera = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.palette.primary };
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  user-select: none;
  height: 2rem;
  width: 2rem;
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
      currentIndex,
      wordsStatus,
      translationsStatus,
      infosStatus,
      nextCard,
      previousCard,
    } = this.props;
    return (
      <PracticeContainer>
        <FlashcardContainer>
          <Flashcard
            wordData={data[currentIndex]}
            status={{
              word: wordsStatus,
              translation: translationsStatus,
              info: infosStatus,
            }}
          />          
        </FlashcardContainer>
        <Buttonera>
          <Button
            onClick={previousCard}
            disabled={data.length === 0 || currentIndex === 0}
          >
            {"<"}
          </Button>
          <Button
            onClick={nextCard}
            disabled={data.length === 0 || currentIndex === (data.length - 1)}
          >
            {">"}
          </Button>
        </Buttonera>
      </PracticeContainer>
    )
  }
}


const mapStateToProps = ({ words }) => ({
  currentIndex: words.currentIndex,
  data: words.arrData,
  wordsStatus: words.wordsStatus,
  translationsStatus: words.translationsStatus,
  infosStatus: words.infosStatus,
});


const mapDispatchToProps = dispatch => ({
  getWord: () => dispatch(wordsActions.getWords.request(1)),
  nextCard: () => dispatch(wordsActions.nextWordIndex()),
  previousCard: () => dispatch(wordsActions.previousWordIndex()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Practice);
