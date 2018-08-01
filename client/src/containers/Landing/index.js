import React from 'react';

import * as SC from './StyledComponents';


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
