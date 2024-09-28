import React from "react";

import UpdateProfile from "./attendee/UpdateProfile";
import Layout from "../components/common/Layout";
import Events from "../components/HomeEvents/Events";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <Events />
      </div>
    </Layout>
  );
}
