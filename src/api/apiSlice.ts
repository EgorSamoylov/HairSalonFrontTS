import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppointmentDto } from './models/appointment';
import { UserDto } from './models/user';
import { AmenityDto } from './models/amenity';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:5006',
  credentials: 'include',
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Appointment', 'Amenity', 'User'],
  endpoints: (builder) => ({
    // Основные endpoint'ы для записей
    getAppointmentById: builder.query<AppointmentDto, number>({
      query: (id) => `/Appointment/${id}`,
      providesTags: (result, error, id) => [{ type: 'Appointment', id }],
    }),

    // Endpoint'ы для связанных данных
    getClientById: builder.query<UserDto, number>({
      query: (id) => `/User/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    getEmployeeById: builder.query<UserDto, number>({
      query: (id) => `/User/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    getAmenityById: builder.query<AmenityDto, number>({
      query: (id) => `/Amenity/${id}`,
      providesTags: (result, error, id) => [{ type: 'Amenity', id }],
    }),
  }),
});

export const {
  useGetAppointmentByIdQuery,
  useGetClientByIdQuery,
  useGetEmployeeByIdQuery,
  useGetAmenityByIdQuery,
} = apiSlice;
