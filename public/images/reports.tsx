import React from "react";

export const ReportsIcon = ({
  size = 24,
  opacity = 0.4,
  className = "",
}: {
  size?: number | string;
  opacity?: number | string;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity={opacity}>
        <path
          d="M12.1212 3.28073C11.2129 2.38907 9.94613 1.14229 9.06201 0.274414V3.28116L12.1212 3.28073Z"
          fill="currentColor"
        />
        <path
          d="M12.4004 4.21816L8.10795 4.21887V0H0V15.3408L4.05483 11.3717L5.48479 12.7771L8.37395 9.9375H7.15407V9H10.0157V11.8125H9.06182V10.5872L5.48479 14.1029L4.05312 12.6958L0.678206 16H12.4004V4.21816ZM6.20023 6.55428H2.38469V5.61678H6.20023V6.55428ZM6.20023 4.21875H2.38469V3.28125H6.20023V4.21875Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
