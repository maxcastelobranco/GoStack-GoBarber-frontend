import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 200px;
    background: #ff9000;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 8px 8px 0 8px;
      bottom: 20px;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      position: absolute;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
