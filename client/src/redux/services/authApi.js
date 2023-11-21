import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const host = "https://chat-0b8t.onrender.com/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/auth` }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        method: "POST",
        url: "/register",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (user) => ({
        method: "POST",
        url: "/login",
        body: user,
      }),
      invalidatesTags: ["auth"],
    }),
    avatar: builder.mutation({
      query: ({ id, data }) => ({
        method: "POST",
        url: `/avatar/${id}`,
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: (token) => ({
        method: "POST",
        url: "/logout",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAvatarMutation,
  useLogoutMutation,
} = authApi;
