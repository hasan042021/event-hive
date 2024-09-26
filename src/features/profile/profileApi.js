import { apiSlice } from "../api/apiSlice";
import { userInfoSet } from "../auth/authSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `members/profiles/${id}`,
      providesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data);
          dispatch(userInfoSet(result.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/members/profiles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
