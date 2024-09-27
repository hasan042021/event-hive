import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";

import { Link, useLocation } from "react-router-dom";
export default function EventDetails({ event }) {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const {
    id,
    thumbnail,
    category,
    organizer,
    name,
    description,
    tags,
    time,
    date,
  } = event;
  return (
    <List>
      <ListItem className="border flex items-center justify-between">
        <ListItemPrefix>
          <Avatar variant="circular" alt="candice" src={thumbnail} />
        </ListItemPrefix>
        <div>
          <Typography className="font-bold" variant="h6" color="gray-600">
            {name}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="italic font-normal"
          >
            Organized by: {organizer.user.first_name} {organizer.user.last_name}
          </Typography>
        </div>
        <div>
          <Typography variant="outline">
            <span>{date} </span>
            {time}
          </Typography>
        </div>
        <div>
          <Button
            size="sm"
            variant="outlined"
            className="capitalize  rounded-full"
          >
            <Link className="text-black" to={`attendee/events/${id}`}>
              See Details
            </Link>
          </Button>
        </div>
        <div>
          <Typography
            variant="small"
            className="flex items-end justify-center"
            color="blue-gray"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="green"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clip-rule="evenodd"
              />
            </svg>
            accept
          </Typography>
          <Typography
            className="flex items-end justify-center font-normal"
            variant="small"
            color="gray"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="red"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                clip-rule="evenodd"
              />
            </svg>
            decline
          </Typography>
        </div>
      </ListItem>
    </List>
  );
}
