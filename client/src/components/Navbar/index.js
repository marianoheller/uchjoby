import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

const LeftGroup = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RightGroup = styled.div``;

const Brand = styled.div`
  font-size: 1.5rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  height: 3rem;
  text-decoration: none;
`;

class Navbar extends Component {
  render() {
    return (
      <NavbarContainer>
        <LeftGroup>
          <StyledLink to="/">
            <Brand>Uchjoby</Brand>
          </StyledLink>
        </LeftGroup>

        <RightGroup>
        </RightGroup>
      </NavbarContainer>
    )
  }
}

export default Navbar;
