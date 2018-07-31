import React, { Component } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftGroup = styled.div``;

const RightGroup = styled.div``;

export default class Navbar extends Component {
  render() {
    return (
      <NavbarContainer>
        <LeftGroup>

        </LeftGroup>

        <RightGroup>

        </RightGroup>
      </NavbarContainer>
    )
  }
}
