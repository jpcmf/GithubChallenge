import styled from 'styled-components';

import colors from '~/styles/colors';

import { device } from '~/styles/device';

export const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
  }

  > div {
    img {
      border: solid 1px ${colors.lightGrey};
      border-radius: 50%;
      height: 135px;
      width: 135px;
      margin-right: 20px;
    }
  }

  ul {
    li {
      line-height: 30px;

      span {
        margin-left: 10px;
      }
    }
  }
`;

export const RepositoriesWrapper = styled.div`
  margin-top: 30px;

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;

    @media ${device.laptop} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.laptopL} {
      grid-template-columns: repeat(3, 1fr);
    }

    li {
      .repository {
        border-radius: 3px;
        border: solid 1px ${colors.lightGrey};
        display: flex;
        padding: 16px;
        min-height: 150px;

        &__header {
          display: flex;
          flex-direction: column;
          flex: 1;

          a,
          span {
            word-break: break-all;
          }

          a {
            color: ${colors.dark};
            text-decoration: none;
            transition: color 300ms ease;

            &:hover {
              color: ${colors.grey};
            }
          }

          span {
            color: ${colors.darkGrey};
            font-size: 14px;
            margin-top: 10px;
          }
        }

        &__footer {
          span {
            display: flex;
            align-items: center;
            font-size: 14px;
            height: 30px;

            svg {
              color: ${colors.brand};
            }

            span {
              color: ${colors.darkGrey};
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
`;
