import React from "react";

import UpdateProfile from "./UpdateProfile";
import Layout from "../../components/common/Layout";

export default function Home() {
  return (
    <Layout>
      <h1>Homepage</h1>
      <UpdateProfile />
    </Layout>
  );
}
