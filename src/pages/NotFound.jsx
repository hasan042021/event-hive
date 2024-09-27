import { Button } from "@material-tailwind/react";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function NotFound({ prevRoute }) {
  return (
    <div>
      <div>404</div>
      <div>Ops! Route Not Found</div>
      <Button>
        <Navigate to={prevRoute}>Go back</Navigate>
      </Button>
    </div>
  );
}
