import React from "react";
import { useSession } from "next-auth/client";
import { CircularProgress } from "@mui/material";

const Help = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <CircularProgress />;
  }

  if (!session) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div>Help</div>
    </div>
  );
};

export default Help;
