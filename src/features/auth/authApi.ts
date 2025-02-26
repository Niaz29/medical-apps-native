import { storeDataJSON } from '../../utils/AsyncStorageService';
import { apiSlice } from '../api/rtkApi';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          console.log("result", result?.data)

          storeDataJSON({
            key: 'MEDICAL_AUTH',
            value: {
              accessToken: result.data.data?.token,
              currentUser: result.data.data,
            },
          });

          dispatch(
            userLoggedIn({
              accessToken: result.data.data?.token,
              currentUser: result.data.data,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          storeDataJSON({
            key: 'MEDICAL_AUTH',
            value: {
              accessToken: result.data.data?.token,
              currentUser: result.data.data,
            },
          });

          dispatch(
            userLoggedIn({
              accessToken: result.data.data?.token,
              currentUser: result.data.data,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    sendOtp : builder.mutation({
      query: (data) => ({
        url: '/message/send-otp',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          storeDataJSON({
            key: 'MEDICAL_AUTH',
            value: {
              accessToken: result.data.data?.token,
              currentUser: result.data.data,
            },
          });

          dispatch(
            userLoggedIn({
              accessToken: result.data.data?.token,
              currentUser: result.data.data,
            }),
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    verifyOtp : builder.mutation({
      query: (data) => ({
        url: '/message/verify-otp',
        method: 'POST',
        body: data,
      }), 
    }),
    updateUserRole : builder.mutation({
      query: ({data, email}) => ({
        url: `/users/${email}`,
        method: 'PATCH',
        body: data,
      }), 
    })
  }),
});

export const {useSigninMutation, useUpdateUserRoleMutation, useSignupMutation, useSendOtpMutation, useVerifyOtpMutation} = authApi;
