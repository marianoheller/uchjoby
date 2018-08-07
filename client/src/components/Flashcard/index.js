import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { Spring } from 'react-spring';


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
  font-size: 1.5rem;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  color: #333;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: white;
`;

const FrontSide = _CardSide.extend`
  /* background-color: grey; */
`;

const BackSide = _CardSide.extend`
  transform: rotateY( 180deg );
`;

const Info = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

const Translation = styled.div``;

const Main = styled.div`
  margin-top: 0.5rem;
`;

const Pronunciation = styled.div`
  margin-top: 0.5rem;
`;

const Extra = styled.ul`
  margin-top: 1rem;
  text-align: left;
  justify-content: center;
  list-style-position: inside;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0.25rem;
`;

const Loader = ({ theme, ...rest}) => (
  <ReactLoading
    type={'bubbles'}
    color={theme.palette.background.primary}
    height={'50px'}
    width={'50px'}
    {...rest}
  />
);


class Flashcard extends Component {
  static propTypes = {
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
    wordData: PropTypes.shape({
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
    wordData: {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.wordData.word !== this.props.wordData.word) {
      this.setState({ isFlipped: false });
    }
  }

  flipCard() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    const { wordData, status, theme, ...rest } = this.props;
    const { isFlipped } = this.state;

    const isFrontSideLoader = status.word.isFetching || status.word.error;
    const isBackSideLoader = status.word.isFetching ||
      status.word.error ||
      status.translation.isFetching ||
      status.translation.error ||
      status.info.isFetching ||
      status.info.error;

    return (
      <CardContainer {...rest}>
        <Card onClick={this.flipCard} isFlipped={isFlipped}>
          <FrontSide>
            { isFrontSideLoader &&
              <LoaderContainer>
                <Loader theme={theme}/>
              </LoaderContainer>
            }
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: isFlipped ? 0 : 1 }}
            >
                {styles => 
                  <div style={styles}>{wordData.word}</div>
                }
            </Spring>
          </FrontSide>
          <BackSide>
            { isBackSideLoader &&
              <LoaderContainer>
                <Loader theme={theme}/>
              </LoaderContainer>
            }
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: isFlipped ? 1 : 0 }}
            >
                {styles => 
                  <div style={styles}>
                    <Translation>{wordData.translation}</Translation>
                      { wordData.info &&
                        <Info>
                          <Main>{wordData.info.main}</Main>
                          <Pronunciation>{wordData.info.pronunciation}</Pronunciation>
                          <Extra>{wordData.info.extra.map((e, i) => <li key={`${e}${i}`}>{e}</li>)}</Extra>
                        </Info>
                      }
                  </div>
                }
            </Spring>
          </BackSide>
        </Card>
      </CardContainer>
    )
  }
}


export default withTheme(Flashcard);
