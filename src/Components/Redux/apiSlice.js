import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.46:3007/api" }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (userId) => `/conversations/${userId}`,
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ senderId, receiverId }) =>
        `/chats/getMessages?senderId=${senderId}&receiverId=${receiverId}`,
      transformResponse: (response, meta, arg) => {
        return response.data.map((msg) => ({
          ...msg,
          type: msg.sender._id === arg.senderId ? "send" : "received",
          timestamp: msg.createdAt,
        }));
      },
    }),
    sendMessage: builder.mutation({
      query: ({ senderId, receiverId, message }) => ({
        url: "/chats/sendMessage",
        method: "POST",
        body: { senderId, receiverId, message },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
