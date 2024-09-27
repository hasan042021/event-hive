import { apiSlice } from "../api/apiSlice";
import { userLogin } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/members/login/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          console.log("hello");
          const result = await queryFulfilled;
          console.log(result);
          localStorage.setItem(
            "session",
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            })
          );
          dispatch(userLogin(result.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "members/register/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          console.log("hello");
          const result = await queryFulfilled;
          localStorage.setItem(
            "session",
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            })
          );

          dispatch(userLogin(result.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
