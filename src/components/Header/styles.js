import styled from 'styled-components';

import colors from '~/styles/colors';

import { device } from '~/styles/device';

export const Container = styled.header`
  background-color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 73px;
  display: flex;
  padding: 0 16px;
  align-items: center;

  .logo {
    border-right: solid 1px ${colors.lightGrey};
    color: ${colors.brand};
    display: none;
    margin-right: 16px;
    padding-right: 16px;

    @media ${device.mobileL} {
      display: flex;
    }
  }

  nav {
    margin: 0 auto;

    @media ${device.mobileL} {
      margin: 0;
    }

    a {
      border-radius: 3px;
      color: ${colors.dark};
      padding: 10px 16px;
      text-decoration: none;
      transition: background-color 300ms ease;

      &:hover {
        background-color: ${colors.secondary};
      }
    }
  }
`;
