import { apiSlice } from './apiSlice';
import { Roles } from './models/roles';

export type UserInfoRequest = object;

export type UserInfoResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  logoAttachmentUrl: string | null;
  role: Roles;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query<UserInfoResponse, UserInfoRequest>({
      query: () => ({
        url: '/User/userInfo',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useUserInfoQuery } = userApiSlice;
