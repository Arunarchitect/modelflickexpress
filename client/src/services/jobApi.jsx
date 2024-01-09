// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../services/urlApi'

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}apijob/jobs`}),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({
      query: (job) => {
        return {
          url: 'create/',
          method: 'POST',
          body: job,
        };
      },
    }),
    getJobprofile: builder.query({
      query: () => {
        return {
          url: 'list/',
          method: 'GET',
        };
      },
    }),
    getProjectprofile: builder.query({
      query: () => {
        return {
          url: 'project/',
          method: 'GET',
        };
      },
    }),
    getWorkprofile: builder.query({
      query: () => {
        return {
          url: 'work/',
          method: 'GET',
        };
      },
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProjectprofileQuery,
  useGetWorkprofileQuery,
  useGetJobprofileQuery,
  useSaveProfileMutation,
  useDeleteProfileMutation
} = jobApi;
