import { apiSlice } from './apiSlice';
import { AppointmentDto } from './models/appointment';

export type CreateAppointmentRequest = {
  clientId: number;
  employeeId: number;
  amenityId: number;
  appointmentDateTime: Date;
  notes?: string;
};

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
    createAppointment: builder.mutation<number, CreateAppointmentRequest>({
      query: (appointment) => ({
        url: '/Appointment',
        method: 'POST',
        body: appointment,
      }),
      invalidatesTags: ['Appointment'],
    }),
    getAppointmentById: builder.query<AppointmentDto, number>({
      query: (id) => ({
        url: `/Appointment/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Appointment', id }],
    }),
  }),
});

export const {
  useAppointmentsQuery,
  useCreateAppointmentMutation,
  useGetAppointmentByIdQuery,
} = appointmentApiSlice;
