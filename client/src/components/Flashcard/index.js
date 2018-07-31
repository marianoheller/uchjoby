import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const CardContainer = styled.div`
  width: 300px;
  height: 300px;
  perspective: 600px;
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
`;

const BackSide = _CardSide.extend`
  transform: rotateY( 180deg );
`;

const Meaning = styled.div``
const Pronunciation = styled.div``


export default class Flashcard extends Component {
  static propTypes = {
    style: PropTypes.instanceOf(Object),
    data: PropTypes.shape({
      front: PropTypes.string,
      back: PropTypes.shape({
        pronunciation: PropTypes.string,
        meaning: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    style: {},
    data: {
      front: '',
      back: {
        pronunciation: '',
        meaning: '',
      },
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
            {data.front}
          </FrontSide>
          <BackSide>
            <Pronunciation>{data.back.pronunciation}</Pronunciation>
            <Meaning>{data.back.meaning}</Meaning>
          </BackSide>
        </Card>
      </CardContainer>
    )
  }
}
