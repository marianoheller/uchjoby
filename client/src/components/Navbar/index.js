import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

const LeftGroup = styled.div``;

const RightGroup = styled.div``;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  text-decoration: none;
`;

class Navbar extends Component {
  render() {
    return (
      <NavbarContainer>
        <LeftGroup>
          <StyledLink to="/">
            Home
          </StyledLink>
        </LeftGroup>

        <RightGroup>
        </RightGroup>
      </NavbarContainer>
    )
  }
}

export default Navbar;
