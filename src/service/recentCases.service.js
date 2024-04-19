import { GETRECENTCASE } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Recent Case route
    getRecentCase: builder.query({
      query: () => ({
        url: GETRECENTCASE,
        method: "GET",
      }),
      providesTags: ["RecentCases"],
    }),
  }),
});

export const { useGetRecentCaseQuery } = userApiSlice;
