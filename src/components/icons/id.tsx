import React from "react";

const IDicon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <defs>
      <style>
        {`.cls-1 {
          fill: none;
          stroke: #000000;
          stroke-linecap: round;
          stroke-linejoin: round;
        }`}
      </style>
    </defs>
    <rect
      className="cls-1"
      x="5.6751"
      y="10.9786"
      width="36.6498"
      height="26.0429"
      rx="3"
    />
    <circle className="cls-1" cx="14.8376" cy="21.4867" r="3.5632" />
    <path
      className="cls-1"
      d="M10.3276,31.0945h9.7835a.92.92,0,0,0,.6994-1.5192,7.1719,7.1719,0,0,0-11.1823,0,.92.92,0,0,0,.6994,1.5192Z"
    />
    <line
      className="cls-1"
      x1="28.7085"
      y1="20.8504"
      x2="35.7076"
      y2="20.8504"
    />
    <line
      className="cls-1"
      x1="28.7085"
      y1="27.7222"
      x2="35.7076"
      y2="27.7222"
    />
    <line className="cls-1" x1="28.7085" y1="24.2863" x2="38.38" y2="24.2863" />
  </svg>
);

export default IDicon;
