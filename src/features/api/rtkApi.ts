import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/apiEndpoints';
import { getDataJSON } from '../../utils/AsyncStorageService';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async headers => {
      const user = await getDataJSON('MEDICAL_AUTH');
      const hasUser = !!user && !!user!.accessToken;

      if (hasUser) {
        headers.set('Authorization', `Bearer ${user!.accessToken}`);
      }

      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['appointments'],
});
