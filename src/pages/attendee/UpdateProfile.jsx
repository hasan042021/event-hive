import React, { useEffect } from "react";
import { useGetProfileQuery } from "../../features/profile/profileApi";

export default function UpdateProfile() {
  const { data } = useGetProfileQuery(2);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>{data?.id}</div>;
}
