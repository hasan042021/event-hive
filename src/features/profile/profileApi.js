import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `events/list/${id}`,
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/members/list/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
