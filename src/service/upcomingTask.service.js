import { GETUPCOMINGTASKS } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Recent Case route
    getUpcomingTasks: builder.query({
      query: () => ({
        url: GETUPCOMINGTASKS,
        method: "GET",
      }),
      providesTags: ["UpcomingTasksCount"],
    }),
  }),
});

export const { useGetUpcomingTasksQuery } = userApiSlice;
