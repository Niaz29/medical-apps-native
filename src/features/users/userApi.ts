import {GET_ALL_SCHOLAR_URL} from '../../constants/apiEndpoints';
import {apiSlice} from '../api/rtkApi';

export const scholarApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllScholar: builder.query({
      query: () => ({
        url: GET_ALL_SCHOLAR_URL,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetAllScholarQuery} = scholarApi;
