import styled from 'styled-components';

import colors from '~/styles/colors';

const Footer = styled.footer`
  margin-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: solid 1px ${colors.grey3};
    color: ${colors.grey3};
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;

    &[disabled] {
      border-color: ${colors.lightGrey};
      color: ${colors.lightGrey};
    }
  }
`;

export default Footer;
