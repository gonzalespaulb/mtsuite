import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export default createApi({
    reducerPath: 'mtsuiteAPI',
    baseQuery: customBaseQuery,

    keepUnusedDataFor: 0,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  
    tagTypes: ['User'],
  
    endpoints: () => ({}),
  });

  