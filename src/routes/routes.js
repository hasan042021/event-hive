import MyEvents from "../pages/attendee/MyEvents";
import UpdateProfile from "../pages/attendee/UpdateProfile";
import Home from "../pages/attendee/Home";
import EventDetails from "../components/Home/EventDetails";
import Events from "../components/Home/Events";
import Attendees from "../pages/organizer/Attendees";
import CreateEvent from "../pages/organizer/CreateEvent";
import Dashboard from "../pages/organizer/Dashboard";
import UpdateEvent from "../pages/organizer/UpdateEvent";

export const attendeePrivateRoutes = [
  {
    path: "events",
    name: "Events",
    component: Events,
  },
  {
    path: "myevents",
    name: "My Events",
    component: MyEvents,
  },
  {
    path: "events/:eventId",
    name: "Event Details",
    component: EventDetails,
  },
  {
    path: "profile",
    name: "Update Details",
    component: UpdateProfile,
  },
];

export const organizerPrivateRoutes = [
  {
    path: "create-event",
    name: "Create Event",
    component: CreateEvent,
  },
  {
    path: "update-event/:eventId",
    name: "Update Event",
    component: UpdateEvent,
  },
  {
    path: "attendees/:eventId",
    name: "Event Attendees",
    component: Attendees,
  },
  {
    path: "created-events",
    name: "Created Events",
    component: Dashboard,
  },
];
