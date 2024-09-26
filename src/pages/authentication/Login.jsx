import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useSelector } from "react-redux";
import { userInfoSet } from "../../features/auth/authSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [login, { data: user, isLoading, isError, isSuccess }] =
    useLoginMutation();
  const { data: userdata } = useGetProfileQuery(
    isLoginSuccess ? user?.user_id : null,
    {
      skip: !isLoginSuccess,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      // Fetch profile data only if login is successful
      setIsLoginSuccess(true);
    }
  }, [isSuccess]);
  useEffect(() => {
    userInfoSet(userdata);
  }, [userdata]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    login({ username, password });
  };

  return (
    <div className="flex justify-center w-full items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
