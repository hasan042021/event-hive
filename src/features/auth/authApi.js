import { apiSlice } from "../api/apiSlice";
import { userLogin } from "./authSlice";

const baseUrl = apiSlice.getBaseQuery().baseUrl;

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
          localStorage.setItem(
            "session",
            JSON.stringify({
              token: result.data.token,
              user_id: result.data.user_id,
            })
          );
          const res = await fetch(
            `${baseUrl}members/list/${result.data.user_id}`
          );
          if (res.ok) {
            const user_data = await res.json();
            const data = {
              token: result.data.token,
              user: user_data,
            };
            dispatch(userLogin(data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "member/register/",
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
              user_id: result.data.user_id,
            })
          );
          const res = await fetch(
            `${baseUrl}members/list/${result.data.user_id}`
          );
          if (res.ok) {
            const user_data = await res.json();
            const data = {
              token: result.data.token,
              user: user_data,
            };
            dispatch(userLogin(data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
