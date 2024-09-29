import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../features/profile/profileApi";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Option,
  Select,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  makeUppercase,
} from "../../utils/array_funcs";
const FREQUENCY = [
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
];

export default function UpdateProfile() {
  const { id } = useSelector((state) => state.auth.user);
  const [now, setNow] = useState(false);
  const { data: user, isSuccess } = useGetProfileQuery(id, {
    skip: !now,
  });
  const [updateProfile] = useUpdateProfileMutation();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [notification, setNotification] = useState("");
  const [in_app, setInApp] = useState("");
  const [freq, setFreq] = useState("");
  useEffect(() => {
    if (id) setNow(true);
  }, [id]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    setFirstName(user?.user.first_name);
    setLastName(user?.user.last_name);
    setEmail(user?.user.email);
    setNotification(user?.receive_email_notifications);
    setInApp(user?.receive_in_app_notifications);
    setFreq(user?.notification_frequency);
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    const userEdited = {
      first_name,
      last_name,
      email,
    };
    const data = {
      user: userEdited,
      receive_email_notifications: notification,
      receive_in_app_notifications: in_app,
      notification_frequency: freq,
    };
    updateProfile({ id, data });
  }
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <CardHeader floated={false} className="h-80">
            <img
              className="h-96 w-full  rounded object-cover object-center shadow-xl shadow-blue-gray-900/50"
              src={user?.image}
              alt="profile image"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {capitalizeFirstLetter(user?.user.first_name)}{" "}
              {capitalizeFirstLetter(user?.user.last_name)}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {user?.role ? makeUppercase(user?.role) : ""}
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </CardFooter>
        </div>
        <div className="flex col-span-2 flex-2 my-3 flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="p-3 w-full m-2 space-y-4">
            <Typography className="text-start  flex justify-end  items-center font-bold">
              Update Info
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
            </Typography>
            <Input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              variant="static"
              label="first_name"
              placeholder="type your name"
            />

            <Input
              variant="static"
              label="last_name"
              placeholder="type your name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type="text"
              variant="static"
              label="email"
              placeholder="type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="file"
              id="image"
              variant="static"
              // Handle image upload here
              onChange={(e) => setImage(e.target.files[0])}
            />
            <hr />
            <Typography className="text-start items-center  flex justify-end  font-bold">
              Settings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Select
              size="md"
              label="Select Version"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
            >
              {FREQUENCY?.map((tag) => (
                <Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Option>
              ))}
            </Select>
            <div>
              <Checkbox
                checked={notification}
                onChange={(e) => setNotification(e.target.checked)}
                ripple={false}
                label="Email Notifications"
                className="block"
              />
            </div>
            <div>
              <Checkbox
                checked={in_app}
                onChange={(e) => setInApp(e.target.checked)}
                label="In-App Notifications"
              />
            </div>

            <Button
              type="submit"
              variant="rounded"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
