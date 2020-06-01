import styled, { css } from 'styled-components';
import { shade } from 'polished';
import arrowRight from '../../assets/arrow-right.svg';
import arrowLeft from '../../assets/arrow-left.svg';

interface AppointmentProps {
  finished: boolean;
}

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      margin: 0 8px;
      border-left: 1px solid #ff9000;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 12px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2.5px solid #ff9000;
      object-fit: cover;
    }

    strong {
      margin-left: 24px;
      color: #ffffff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div<AppointmentProps>`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 80px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 12px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 1.4px solid #ff9000;
      object-fit: cover;
    }

    strong {
      margin-left: 24px;
      color: #ffffff;
      font-size: 20px;
    }
  }

  ${props =>
    props.finished &&
    css`
      opacity: 0.6;

      span {
        text-decoration: line-through;
      }

      div {
        text-decoration: line-through;
      }
    `}
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 6px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
    transition: background-color 250ms ease;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Weekday {
    padding: 1em;
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #ff9000;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  .DayPicker-NavButton--prev {
    background-image: url(${arrowLeft});
    height: 42px;
    width: 42px;
    margin: 2px 42px 0 0;
    transition: opacity 250ms ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .DayPicker-NavButton--next {
    background-image: url(${arrowRight});
    height: 42px;
    width: 42px;
    transition: opacity 250ms ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
