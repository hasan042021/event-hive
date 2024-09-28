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

import { Link } from "react-router-dom";
import {
  convertTo12HourFormat,
  formatDate,
} from "../../utils/date_time_format";
export default function EventDetails({ event }) {
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
    <Card className="w-3/4 my-2">
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
              Organized by: {organizer.user.first_name}{" "}
              {organizer.user.last_name}
            </Typography>
          </div>
          <div>
            <Typography variant="outline">
              ({convertTo12HourFormat(time)})<span>{formatDate(date)}</span>
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
        </ListItem>
      </List>
    </Card>
  );
}
