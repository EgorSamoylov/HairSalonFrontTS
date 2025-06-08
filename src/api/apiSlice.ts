import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:5006',
  credentials: 'include',
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Appointment', 'Amenity', 'User'],
  endpoints: () => ({}),
});

// eslint-disable-next-line no-empty-pattern
export const {} = apiSlice;
