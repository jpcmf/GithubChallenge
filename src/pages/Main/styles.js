import styled, { keyframes, css } from 'styled-components';

import colors from '~/styles/colors';

import { device } from '~/styles/device';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 20px;
  max-width: 1180px;

  @media ${device.laptop} {
    margin: 40px 30px;
  }

  @media ${device.laptopL} {
    margin: 40px auto 0;
  }

  > div {
    margin: 0 0 20px;
    width: 100%;

    @media ${device.laptop} {
      margin: 0 auto 40px;
    }
  }
`;

export const MainColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media ${device.laptop} {
    grid-gap: 40px;
    grid-template-columns: repeat(2, 1fr);
  }

  > div {
    margin: 0;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    border-radius: 4px;
    border: 1px solid ${props => (props.error ? 'red' : '#eee')};
    flex: 1;
    font-size: 16px;
    padding: 10px 15px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  align-items: center;
  background-color: ${colors.brand};
  border-radius: 4px;
  border: 0;
  display: flex;
  justify-content: center;
  margin-left: 10px;
  padding: 0 15px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;

    & + li {
      border-top: solid 1px #eee;
    }

    img {
    }

    a {
      color: ${colors.brand};
      padding: 10px 16px;
      text-decoration: none;
      transition: background-color 300ms ease;

      &:hover {
        background-color: ${colors.secondary};
        border-radius: 3px;
      }
    }

    button {
      background-color: transparent;
      border: 0;
      color: ${colors.danger};
      font-size: 12px;
      padding: 10px 16px;
      transition: background-color 300ms ease;

      &:hover {
        background-color: ${colors.secondary};
        border-radius: 3px;
      }
    }
  }

  &.most-actived {
    li {
      > div {
        display: flex;
        align-items: center;
      }

      .most-actived__user {
        flex: 1;

        img {
          border-radius: 50%;
          height: 30px;
          margin-right: 10px;
          width: 30px;
        }
      }

      .most-actived__repo-name {
        align-items: flex-end;
        background-color: ${colors.secondary};
        border-radius: 3px;
        flex-direction: column;
        margin-right: 20px;
        padding: 3px 5px;
        text-align: right;

        small {
          color: ${colors.darkGrey};
          font-size: 12px;
          display: block;
        }
      }

      .most-actived__star {
        justify-content: space-between;
        width: 45px;

        svg {
          color: ${colors.brand};
        }
        span {
          color: ${colors.darkGrey};
          font-size: 12px;
        }
      }
    }
  }
`;
