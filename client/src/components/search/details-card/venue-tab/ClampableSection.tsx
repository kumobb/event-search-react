import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ClampableSection = ({
  name,
  content,
}: {
  name: string;
  content: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h4>{name}</h4>
      <p>
        <span className={open ? "" : "clamp-line"}>{content}</span>
        {content.length > 100 && (
          <u
            role="button"
            className="link-info small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? (
              <>
                <br />
                Show Less
                <KeyboardArrowUpIcon sx={{ color: "white" }} />
              </>
            ) : (
              <>
                Show More
                <KeyboardArrowDownIcon sx={{ color: "white" }} />
              </>
            )}
          </u>
        )}
      </p>
    </>
  );
};

export default ClampableSection;
