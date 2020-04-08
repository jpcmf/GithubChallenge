import styled from 'styled-components';

import colors from '~/styles/colors';

export const DetailsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 20px;

    img {
      border: solid 1px ${colors.lightGrey};
      border-radius: 50%;
      height: 135px;
      width: 135px;
      margin-bottom: 20px;
    }

    span {
      font-size: 18px;
      font-weight: 600;
    }
  }

  ul {
    width: 100%;

    li {
      border-bottom: solid 1px ${colors.lightGrey};
      line-height: 30px;
      padding-bottom: 16px;

      &:not(:first-child) {
        margin-top: 16px;
      }

      &:last-child {
        border: 0;
      }

      strong {
        font-size: 12px;
      }

      span {
        display: block;
      }

      a {
        color: ${colors.brand};
        text-decoration: none;
      }
    }
  }
`;
