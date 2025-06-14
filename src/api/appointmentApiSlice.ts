import { apiSlice } from './apiSlice';
import { AppointmentDto } from './models/appointment';

export type GetAllAppointmentsRequest = object;

export type GetAllAppointmentsResponse = AppointmentDto[];

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    appointments: builder.query<
      GetAllAppointmentsResponse,
      GetAllAppointmentsRequest
    >({
      query: () => ({
        url: '/Appointment',
        method: 'GET',
      }),
      providesTags: ['Appointment'],
    }),
  }),
});

export const { useAppointmentsQuery } = appointmentApiSlice;
