import { apiSlice } from "../api/apiSlice";

const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "events/list/",
      providesTags: ["Events"],
    }),
    getEvent: builder.query({
      query: (id) => `events/list/${id}`,
      providesTags: (result, error, arg) => [{ type: "Events", id: arg }],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/events/list/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Events",
        { type: "Events", id: arg.id },
      ],
    }),
    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `/events/list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    getFilteredEvents: builder.query({
      query: (filters) => ({
        url: "events/list/",
        params: {
          category__name: filters.category,
          tags: filters.tags?.join(","),
        },
      }),
      providesTags: ["Events"],
    }),
    getOrganizersEvents: builder.query({
      query: (id) => ({
        url: "events/list/",
        params: {
          organizer__id: id,
        },
      }),
      providesTags: ["Events"],
    }),
    getTags: builder.query({
      query: () => "events/tags/",
      providesTags: ["Tags"],
    }),
    getCategories: builder.query({
      query: () => "events/categories/",
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetEventQuery,
  useGetEventsQuery,
  useUpdateEventMutation,
  useGetFilteredEventsQuery,
  useGetOrganizersEventsQuery,
  useDeleteEventMutation,
} = eventsApi;
