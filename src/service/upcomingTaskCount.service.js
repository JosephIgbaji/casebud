import { GETUPCOMINGTASKSCOUNT } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Recent Case route
    getUpcomingTasksCount: builder.query({
      query: () => ({
        url: GETUPCOMINGTASKSCOUNT,
        method: "GET",
      }),
      providesTags: ["UpcomingTasksCount"],
    }),
  }),
});

export const { useGetUpcomingTasksCountQuery } = userApiSlice;
