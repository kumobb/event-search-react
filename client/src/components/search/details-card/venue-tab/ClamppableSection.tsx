import React, { useLayoutEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ClamppableSection = ({
  name,
  content,
}: {
  name: string;
  content: string;
}) => {
  const [open, setOpen] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (
      ref.current &&
      ref.current.offsetHeight / parseInt(ref.current.style.lineHeight) > 2
    ) {
      setShouldShowButton(true);
    } else {
      setShouldShowButton(false);
    }
  }, [ref]);

  return (
    <>
      <h4>{name}</h4>
      <p>
        <span className={open ? "" : "clamp-line"} ref={ref}>
          {content}
        </span>
        {!shouldShowButton && (
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

export default ClamppableSection;
