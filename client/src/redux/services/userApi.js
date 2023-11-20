import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const host =
  "https://chat-0b8t.onrender.com/api" || "http://localhost:5500/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/chat` }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `/users/${id}`,
      }),
      invalidatesTags: ["user"],
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/add-message",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllMessages: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/get-messages",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteMessage: builder.mutation({
      query: (data) => ({
        method: "DELETE",
        url: "/delete-message",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersMutation,
  useAddMessageMutation,
  useGetAllMessagesMutation,
  useDeleteMessageMutation,
} = userApi;
