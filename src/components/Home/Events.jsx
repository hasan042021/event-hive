import React, { useEffect } from "react";
import { useGetEventsQuery } from "../../features/events/eventsApi";
import EventDetails from "./EventDetails";
import { Card, List } from "@material-tailwind/react";

export default function Events() {
  const { data: events, isLoading, isSuccess } = useGetEventsQuery();
  useEffect(() => {
    if (isSuccess) console.log(events);
  }, [isSuccess]);
  return (
    <Card className="w-3/4">
      {events?.length > 0
        ? events.map((event) => <EventDetails event={event} />)
        : ""}
    </Card>
  );
}
