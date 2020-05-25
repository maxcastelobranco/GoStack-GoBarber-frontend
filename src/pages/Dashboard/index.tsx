import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
  Section,
  Appointment,
} from './styles';
import Header from '../../components/Header';
import api from '../../services/apiClient';
import { useAuth } from '../../hooks/auth';

interface Availability {
  day: number;
  available: boolean;
  isFull: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<Availability[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        const formattedAppointments = data.map(appointment => {
          return {
            ...appointment,
            formattedHour: format(parseISO(appointment.date), 'HH:mm'),
          };
        });

        formattedAppointments.sort((a, b) => {
          return Number(a.formattedHour.slice(0, 2)) - Number(b.formattedHour.slice(0, 2));
        });

        setAppointments(formattedAppointments);
      });
  }, [selectedDate]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const nextBusinessDay = useMemo(() => {
    const possibleBusinessDay = selectedDate;

    if (possibleBusinessDay.getDay() === 6) {
      possibleBusinessDay.setDate(selectedDate.getDate() + 2);
      return possibleBusinessDay;
    }
    if (possibleBusinessDay.getDay() === 0) {
      possibleBusinessDay.setDate(selectedDate.getDate() + 1);
      return possibleBusinessDay;
    }

    return possibleBusinessDay;
  }, [selectedDate]);
  const disabledDays = useMemo(() => {
    return monthAvailability
      .filter(monthDay => !monthDay.available && !monthDay.isFull)
      .map(monthDay => {
        return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), monthDay.day);
      });
  }, [currentMonth, monthAvailability]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const selectedDateEqualsToday = useMemo(() => isToday(selectedDate), [selectedDate]);
  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBr });
  }, [selectedDate]);
  const selectedWeekDay = useMemo(() => {
    const weekDay = format(selectedDate, 'cccc', { locale: ptBr });
    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => parseISO(appointment.date).getHours() < 13);
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => parseISO(appointment.date).getHours() >= 13);
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()));
  }, [appointments]);

  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {selectedDateEqualsToday && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {selectedDateEqualsToday && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.formattedHour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>
            {morningAppointments.length === 0 && <p>¯\_(ツ)_/¯ Nenhum agendamento de manhã.</p>}
            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {morningAppointments.length === 0 && <p>¯\_(ツ)_/¯ Nenhum agendamento à tarde.</p>}
            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={nextBusinessDay}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
