import { apiSlice } from './apiSlice';
import { AmenityDto } from './models/amenity';

export type GetAllAmenitiesRequest = object;

export type GetAllAmenitiesResponse = AmenityDto[];

export const amenityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    amenities: builder.query<GetAllAmenitiesResponse, GetAllAmenitiesRequest>({
      query: () => ({
        url: '/Amenity',
        method: 'GET',
      }),
      providesTags: ['Amenity'],
    }),
  }),
});

export const { useAmenitiesQuery } = amenityApiSlice;
