import { GETLASTUPDATE } from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Last update route
    getLastUpdate: builder.query({
      query: () => ({
        url: GETLASTUPDATE,
        method: "GET",
      }),
      providesTags: ["LastUpdate"],
    }),
  }),
});

export const { useGetLastUpdateQuery } = userApiSlice;
