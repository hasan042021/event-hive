import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../features/profile/profileApi";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
      <div className="flex my-3 flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-3 shadow m-2 space-y-4"
        >
          <h2 className="text-center text-2xl font-bold">User Profile</h2>
          <div className="flex flex-col">
            <label htmlFor="first_name" className="text-gray-700 font-bold">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name" className="text-gray-700 font-bold">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name" className="text-gray-700 font-bold">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-gray-700 font-bold">
              Image
            </label>
            <input
              type="file"
              id="image"
              // Handle image upload here
              onChange={(e) => setImage(e.target.files[0])}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="receive_email_notifications"
              className="mr-2"
              checked={notification}
              onChange={(e) => setNotification(e.target.checked)}
            />
            <label
              htmlFor="receive_email_notifications"
              className="text-gray-700 font-bold"
            >
              Receive Email Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="receive_in_app_notifications"
              className="mr-2"
              checked={in_app}
              onChange={(e) => setInApp(e.target.checked)}
            />
            <label
              htmlFor="receive_in_app_notifications"
              className="text-gray-700 font-bold"
            >
              Receive In-App Notifications
            </label>
          </div>
          <div className="flex items-center">
            <label htmlFor="tags" className="text-gray-700 font-bold">
              Tags
            </label>
            <select
              id="tags"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
            >
              {FREQUENCY?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
              Edit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
