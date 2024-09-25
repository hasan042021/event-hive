import { apiSlice } from "../api/apiSlice";
import { userLogin } from "./authSlice";


export const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
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
                    accessToken: result.data.accessToken,
                    user_id: result.data.user_id,
                  })
                );
                dispatch(userLogin(result.data));
              } catch (error) {console.log(error);}
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
                    accessToken: result.data.token,
                    user_id: result.data.user_id,
                  })
                );
                dispatch(userLogin(result.data));
              } catch (error) {console.log(error);}
            },
          }),
    }),
})