import { GETALLCASE } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Case route
    getAllCase: builder.query({
      query: () => ({
        url: GETALLCASE,
        method: "GET",
      }),
      providesTags: ["AllCase"],
    }),
  }),
});

export const { useGetAllCaseQuery } = userApiSlice;
