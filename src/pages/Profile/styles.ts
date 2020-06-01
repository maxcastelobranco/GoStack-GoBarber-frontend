import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;

  header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    svg {
      margin-left: 36px;
      stroke: #ff9000;
      transition: stroke 250ms ease;

      &:hover {
        stroke: ${shade(0.2, '#ff9000')};
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  line-height: 12px;
  animation: ${appearFromLeft} 1s ease;

  form {
    margin: -56px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  align-self: center;
  margin-bottom: 32px;

  img {
    width: 186px;
    height: 186px;
    object-fit: cover;
    border-radius: 50%;
    border: 3.2px solid #ff9000;
  }

  label {
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
    background: #ff9000;
    border: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 250ms ease;

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
