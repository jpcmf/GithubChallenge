import styled from 'styled-components';

import colors from '~/styles/colors';

import { device } from '~/styles/device';

const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 20px 16px;
  max-width: 1180px;
  padding: 30px;

  @media ${device.laptop} {
    margin: 40px 30px;
  }

  @media ${device.laptopL} {
    margin: 40px auto;
  }

  h1 {
    align-items: center;
    color: ${colors.brand};
    display: flex;
    flex-direction: row;
    font-size: 20px;

    svg {
      color: ${colors.brand};
      margin-right: 10px;
    }
  }

  .title-group {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media ${device.laptop} {
      flex-direction: row;
    }

    .filter {
      display: flex;
      align-items: center;
      flex-direction: column;

      @media ${device.laptop} {
        flex-direction: row;
      }

      span {
        font-size: 12px;
        font-weight: 600;
        margin: 20px 0 5px;

        @media ${device.laptop} {
          margin: 0 20px 0 0;
        }
      }

      button {
        background-color: ${colors.lightGrey};
        border: 0;
        border-radius: 3px;
        padding: 10px 16px;
        font-size: 13px;
        transition: all 300ms ease;

        + button {
          margin-left: 5px;
        }

        &:hover {
          background-color: ${colors.secondary};
        }
      }
    }
  }
`;

export default Container;
