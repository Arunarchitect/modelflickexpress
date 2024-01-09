// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../services/urlApi'

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}apis/user`}), 
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query: (user) => {
          return {
            url: 'register/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type':'application/json',
            }
          };
        }
      }),
      loginUser: builder.mutation({
        query: (user) => {
          return {
            url: 'login/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type':'application/json',
            }
          };
        }
      }),
      getLoggedUser: builder.query({
        query: (access_token) => {
          return {
            url: 'profile/',
            method: 'GET',
            headers: {
              'authorization': `Bearer ${access_token}`,
            }
          }
        }
      }),
      changeUserPassword: builder.mutation({
        query: ({ actualData, access_token }) => {
          return {
            url: 'changepassword/',
            method: 'POST',
            body: actualData,
            headers: {
              'authorization': `Bearer ${access_token}`,
            }
          }
        }
      }),
      sendPasswordResetEmail: builder.mutation({
        query: (user) => {
          return {
            url: 'send-reset-password-email/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),
      resetPassword: builder.mutation({
        query: ({ actualData, id, token }) => {
          return {
            url: `/reset-password/${id}/${token}/`,
            method: 'POST',
            body: actualData,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),

  }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery,useChangeUserPasswordMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation} = testApi

export const testApi1 = createApi({
  reducerPath: 'testApi1',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}apiblog` }),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({
      query: (blog) => {
        return {
          url: 'blog/',
          method: 'POST',
          body: blog
        };
      }
    }),
    getResumeprofile: builder.query({
      query: () => {
        return {
          url: 'list/',
          method: 'GET',
        };
      }
    }),
    updateProfile: builder.mutation({
      query: ({ id, title, subtitle, content }) => ({
        url: `/blog/update/${id}`, // Adjust the endpoint URL based on your API
        method: 'PUT',
        body: { title, subtitle, content },
      }),
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `blog/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSaveProfileMutation, useGetResumeprofileQuery, useDeleteProfileMutation,useUpdateProfileMutation } = testApi1

export const testApi2 = createApi({
  reducerPath: 'testApi2',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}apijob` }),
  endpoints: (builder) => ({
    saveProject: builder.mutation({
      query: (blog) => {
        return {
          url: 'projects/',
          method: 'POST',
          body: blog
        };
      }
    }),
    getProject: builder.query({
      query: () => {
        return {
          url: 'projects/',
          method: 'GET',
        };
      }
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSaveProjectMutation, useGetProjectQuery, useDeleteProjectMutation } = testApi2