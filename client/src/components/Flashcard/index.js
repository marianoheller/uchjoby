import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  perspective: 100vw;
  font-weight: 400;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const _CardSide = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.background.primary};
`;

const FrontSide = _CardSide.extend`
  /* background-color: grey; */
`;

const BackSide = _CardSide.extend`
  transform: rotateY( 180deg );
`;

const Info = styled.div``
const Translation = styled.div``


export default class Flashcard extends Component {
  static propTypes = {
    style: PropTypes.instanceOf(Object),
    status: PropTypes.shape({
      word: PropTypes.shape({
        error: PropTypes.string,
        isFetching: PropTypes.bool,
      }),
      translation: PropTypes.shape({
        error: PropTypes.string,
        isFetching: PropTypes.bool,
      }),
      info: PropTypes.shape({
        error: PropTypes.string,
        isFetching: PropTypes.bool,
      }),
    }),
    data: PropTypes.shape({
      word: PropTypes.string,
      translation: PropTypes.string,
      info: PropTypes.shape({
        pronunciation: PropTypes.string,
        main: PropTypes.string,
        extra: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }

  static defaultProps = {
    style: {},
    data: {
      word: '',
      translation: '',
      info: null,
    },
  }

  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    const { style, data } = this.props;
    const { isFlipped } = this.state;
    return (
      <CardContainer style={style}>
        <Card onClick={this.flipCard} isFlipped={isFlipped}>
          <FrontSide>
            {data.word}
          </FrontSide>
          <BackSide>
            <Translation>{data.translation}</Translation>
            <Info>{data.info}</Info>
          </BackSide>
        </Card>
      </CardContainer>
    )
  }
}
