import { apiSlice } from "../api/apiSlice";

const rsvpApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRSVPs: builder.query({
      query: () => "events/rsvp-list/",
      providesTags: ["RSVPs"],
    }),
    getAttendeeRSVPs: builder.query({
      query: (filters) => ({
        url: "events/rsvp-list/",
        params: {
          attendee__id: filters.id,
        },
      }),
      providesTags: ["RSVPs"],
    }),
    getRSVPbyEvent: builder.query({
      query: (filters) => ({
        url: "events/rsvp-list/",
        params: {
          event__id: filters.id,
        },
      }),
      providesTags: ["RSVPs"],
    }),
    createRSVP: builder.mutation({
      query: (data) => ({
        url: "events/rsvp-list/",
        method: "POST",
        body: data,
      }),
      providesTags: ["RSVPs"],
    }),
  }),
});

export const { useGetRSVPsQuery, useGetAttendeeRSVPsQuery } = rsvpApi;
