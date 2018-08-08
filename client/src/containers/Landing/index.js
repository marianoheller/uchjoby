import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as SC from './StyledComponents';


const Landing = props => (
  <SC.LandingWrapper>
    <SC.Title>Uchjoby</SC.Title>
    <SC.Subtitle>Learn through flashcards</SC.Subtitle>

    <SC.ButtonsContainer>
      <SC.ButtonLink
        disabled={props.data.length === 0}
        to="/practice"
        text="Practice now!"
      />
    </SC.ButtonsContainer>

  </SC.LandingWrapper>
);


Landing.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
}

Landing.defaultProps = {
  data: [],
}

const mapStateToProps = ({ words }) => ({
  data: words.arrData,
});


const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
