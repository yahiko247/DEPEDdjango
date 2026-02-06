import React from "react";

const Tabs = ({ name, label }) => {
  return (
    <input
      type="radio"
      name={name}
      className="tab rounded-full flex flex-1 font-bold"
      aria-label={label}
    />
  );
};

export default Tabs;
