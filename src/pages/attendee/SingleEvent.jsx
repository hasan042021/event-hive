import React from "react";
import { useGetEventQuery } from "../../features/events/eventsApi";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import Layout from "../../components/common/Layout";

export default function SingleEvent() {
  const { eventId } = useParams();
  console.log(eventId);
  const { data: event } = useGetEventQuery(eventId);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-[48rem] flex-row m-2">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src={event?.thumbnail}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              {event?.organizer.user.first_name}{" "}
              {event?.organizer.user.last_name}
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {event?.name}
            </Typography>
            <Typography color="gray" className="font-normal">
              {event?.category.name}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {event?.description}
            </Typography>
            <Typography>
              {event?.tags?.map((tag) => (
                <Chip className="inline-block m-1" value={tag.name} />
              ))}
            </Typography>
            <a href="#" className="inline-block">
              <Button variant="text" className=" flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
