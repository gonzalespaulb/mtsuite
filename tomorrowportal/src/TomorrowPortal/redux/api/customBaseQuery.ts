import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";

const API = process.env?.REACT_APP_API_URL ?? '';

const baseQuery = fetchBaseQuery({
  baseUrl: `${API}/api/v1`,
  prepareHeaders: (headers, {getState}) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

const customBaseQuery: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export default customBaseQuery;
