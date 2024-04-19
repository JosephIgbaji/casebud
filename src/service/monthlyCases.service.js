import { GETMONTHLYCASES } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Recent Case route
    getMonthlyCase: builder.query({
      query: () => ({
        url: GETMONTHLYCASES,
        method: "GET",
      }),
      providesTags: ["MonthylyCases"],
    }),
  }),
});

export const { useGetMonthlyCaseQuery } = userApiSlice;
