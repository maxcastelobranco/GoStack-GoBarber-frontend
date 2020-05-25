import styled from 'styled-components';

export const Container = styled.div`
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    color: #999591;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: color 250ms ease;

    &:hover {
      color: #ff9000;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border: 2px solid #ff9000;
    border-radius: 50%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: opacity 250ms ease;

    &:hover {
      opacity: 0.6;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      transition: opacity 250ms ease;

      strong {
        color: #ff9000;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
