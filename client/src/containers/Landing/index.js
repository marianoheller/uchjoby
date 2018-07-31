import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as SC from './StyledComponents';

const LandingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Landing = () => (
  <SC.LandingWrapper>
    <SC.Title>Uchjoby</SC.Title>
    <SC.Subtitle>Learn through flashcards</SC.Subtitle>

    <SC.ButtonsContainer>
      <SC.ButtonLink to="/practice" text="Practice now!" />
    </SC.ButtonsContainer>

  </SC.LandingWrapper>
);

export default Landing;
