import * as React from "react";
import { useLocation } from "react-router-dom";

import Album from "./Album";

export default function SimpleContainer() {
  const location = useLocation();

  console.log(location.state, "location");
  return (
    <React.Fragment>
      <Album />
    </React.Fragment>
  );
}
