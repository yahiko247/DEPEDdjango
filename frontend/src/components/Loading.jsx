import React, { useEffect, useState } from "react";
import spinner from "../assets/loadingtransparen.svg";

export default function Loading({ children, delay = 3000 }) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false); // hide spinner after 3 seconds
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {showSpinner ? <img src={spinner} alt="loading" /> : children}
    </div>
  );
}
