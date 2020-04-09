import styled from 'styled-components';

import colors from '~/styles/colors';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  padding-bottom: 50px;

  button {
    background-color: transparent;
    border-radius: 4px;
    border: solid 1px ${colors.grey3};
    color: ${colors.grey3};
    font-weight: 600;
    padding: 5px 15px;
    transition: all 300ms ease;

    &:hover:enabled {
      border: solid 1px ${colors.darkGrey};
      color: ${colors.darkGrey};
    }

    &[disabled] {
      border-color: ${colors.lightGrey};
      color: ${colors.lightGrey};
    }
  }
`;

export default Footer;
