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
  height: calc(100% - 4rem - 1.5rem);
  margin: 0.5rem 0.5rem 1rem 0.5rem;
`;

const Buttonera = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

const Button = styled.div`
  color: ${({ theme }) => theme.palette.primary };
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;

  height: 3rem;
  width: 3rem;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 50%;
  margin: 0 0.75rem;
  background-color: ${({ theme }) => theme.palette.button.normal};
  color: white;

  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  filter: ${({ disabled }) => (disabled ? 'brightness(90%)' : 'brightness(100%)')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover:enabled {
    background-color: ${({ theme }) => theme.palette.button.selected};
    color: #444;
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
            onClick={e => {
              if (data.length === 0 || currentIndex === 0) return () => {};
              return previousCard(e);
            }}
            disabled={data.length === 0 || currentIndex === 0}
          >
            {"<"}
          </Button>
          <Button
            onClick={e => {
              if (data.length === 0 || currentIndex === (data.length - 1)) return () => {};
              return nextCard(e);
            }}
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
