import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2.75em;
  font-weight: 300;
  justify-content: center;
  align-items: center;
  margin-top: 25vh;
  color: ${({ theme }) => theme.palette.primary};
`;

export const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.25em;
  font-weight: 300;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30vh;

  & > div {
    background-color: ${({ theme }) => theme.palette.button.normal};  
  }

  /* Mobile */
  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.primary};
    & > div:first-child  {
      text-decoration: none;
    }
  }
`;

/* eslint-disable react/prop-types */
export const __ButtonLink = ({
  className,
  to,
  text,
  ...rest
}) => (
  <div className={className} {...rest}>
    <Link to={to} >{text}</Link>
  </div>
);
/* eslint-enable react/prop-types */

export const ButtonLink = styled(__ButtonLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  &:hover {
    filter: brightness(90%);
  }
  & > a {
    text-decoration: none;
    font-weight: bold;
    padding: 0.75rem 1rem;
    color: ${props => props.theme.palette.primary};
  }

   /* Mobile */
  @media (max-width: 768px) {
    width: 50%;
    margin: 0;
    & > a {
      width: 100%;
      text-align: center;
    }
  }
`;
