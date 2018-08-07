import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring'

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
  display: flex;
  flex-direction: row;
  
  max-width: 600px;
  width: 90%;
  height: calc(100% - 3rem - 1.5rem); /* 100% - navbar - margins */
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  z-index: ${({ theme }) => theme.zIndex.flashcard};

  @media only screen and (max-width: 768px) {
    height: calc(100% - 3rem - 4rem - 1.5rem); /* 100% - navbar - buttons - margins */
  }
`;

const Buttonera = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;

  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);

  @media only screen and (max-width: 768px) {
    position: inherit;
    bottom: unset;
    left: unset;
    right: unset;
    transform: translate(0, 0);
  }
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

class Practice extends React.Component {
  constructor(props) {
    super();
    this.state = {
      prevIndex: props.currentIndex,
    }
  }

  componentDidUpdate(prevProps) {
    if ( prevProps.currentIndex !== this.props.currentIndex ) {
      this.setState({
        prevIndex: prevProps.currentIndex,
      })
    }
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
    const { prevIndex } = this.state;
    const rangeWords = data.slice(
      currentIndex > 0 ? currentIndex - 1 : 0,
      currentIndex + 2
    );
    return (
      <PracticeContainer>
        <FlashcardContainer>
          <Transition
            keys={rangeWords.map((e, i) => i - 1)}
            from={{ opacity: 0, x: 300 }}
            enter={{ opacity: 1, x: 0 }}
            leave={{ opacity: 0, x: -300 }}
            native
          >
            {rangeWords.map(wordData => ({ opacity, x }) =>
              <animated.div
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: opacity.interpolate(o => o),
                  transform: x.interpolate(pos => `translate3d(${pos}px,0px,0px)`),
                }}
              >
                <Flashcard
                  wordData={wordData}
                  status={{
                    word: wordsStatus,
                    translation: translationsStatus,
                    info: infosStatus,
                  }}
                />          
              </animated.div>
            )}
          </Transition>
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
  nextCard: () => dispatch(wordsActions.nextWordIndex()),
  previousCard: () => dispatch(wordsActions.previousWordIndex()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Practice);
