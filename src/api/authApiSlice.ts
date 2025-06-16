import { apiSlice } from './apiSlice';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequest>({
      query: (args) => ({
        url: '/auth/login',
        method: 'POST',
        body: args,
        credentials: 'include', // Важно для работы с cookie
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (args) => ({
        url: '/auth/register',
        method: 'POST',
        body: args,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async onQueryStarted(arg, { dispatch }) {
        // Очищаем localStorage при выходе
        localStorage.removeItem('auth_token');
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
