import React from "react";
import Layout from "./common/Layout";
import UpdateProfile from "./attendee/UpdateProfile";

export default function Home() {
  return (
    <Layout>
      <h1>Homepage</h1>
      <UpdateProfile />
    </Layout>
  );
}
