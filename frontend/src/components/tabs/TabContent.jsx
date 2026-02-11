import React from "react";
import { Profile } from "../../assets";

const TabContent = ({ content }) => {
  return (
    <div className="flex flex-1  flex-row px-2 xs:px-6 border border-red-500 h-15 items-center">
      <img
        src={Profile}
        className="rounded-full size-10 bg-cover border border-blue-500 hidden md:flex"
      />
      {content}
    </div>
  );
};

export default TabContent;
