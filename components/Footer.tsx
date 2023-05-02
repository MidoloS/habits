import Link from "next/link";
import { FC } from "react";

export const HOME_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24.005"
    viewBox="0 0 24 24.005"
  >
    <path
      id="house-chimney_1_"
      data-name="house-chimney (1)"
      d="M22,5.724V2a1,1,0,0,0-2,0V4.366L14.8.855A4.981,4.981,0,0,0,9.2.855l-7,4.724A5,5,0,0,0,0,9.724V19a5.006,5.006,0,0,0,5,5H8a1,1,0,0,0,1-1V15a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v8a1,1,0,0,0,1,1h3a5.006,5.006,0,0,0,5-5V9.724A5,5,0,0,0,22,5.724ZM22,19a3,3,0,0,1-3,3H17V15a3,3,0,0,0-3-3H10a3,3,0,0,0-3,3v7H5a3,3,0,0,1-3-3V9.724A3,3,0,0,1,3.322,7.237l7-4.724a2.985,2.985,0,0,1,3.355,0l7,4.724A3,3,0,0,1,22,9.724V19Z"
      transform="translate(0 0.005)"
      fill="#cbd5e1"
    />
  </svg>
);

export const LEADERBOARD_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23.642"
    height="23.966"
    viewBox="0 0 23.642 23.966"
  >
    <path
      id="chart-pyramid"
      d="M23.413,18.24,15.593,2.275a4,4,0,0,0-7.185,0L.587,18.24A4,4,0,0,0,4.179,24H19.82a4,4,0,0,0,3.593-5.76ZM19.6,15H4.4l2.45-5h10.3ZM10.2,3.155a2,2,0,0,1,3.592,0L16.169,8H7.83Zm11.314,17.9a1.964,1.964,0,0,1-1.7.942H4.179a2,2,0,0,1-1.8-2.88L3.421,17H20.578l1.038,2.12a1.961,1.961,0,0,1-.1,1.938Z"
      transform="translate(-0.179 -0.034)"
      fill="#cbd5e1"
    />
  </svg>
);

export const ADD_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="53.666"
    height="53.666"
    viewBox="0 0 53.666 53.666"
  >
    <rect
      id="Rectangle_514"
      data-name="Rectangle 514"
      width="38"
      height="38"
      rx="12"
      transform="translate(25.427) rotate(42)"
      fill="#122633"
    />
    <g id="plus" transform="translate(19.2 19.219)">
      <path
        id="Path_4"
        data-name="Path 4"
        d="M14.313,6.68H8.588V.954a.954.954,0,0,0-1.908,0V6.68H.954a.954.954,0,0,0,0,1.908H6.68v5.725a.954.954,0,0,0,1.908,0V8.588h5.725a.954.954,0,0,0,0-1.908Z"
        fill="#f3f3f3"
      />
    </g>
  </svg>
);

export const Footer: FC = () => (
  <footer className="fixed bg-slate-100 bottom-0 flex justify-around w-full items-center py-2">
    <Link href="/habits">{HOME_ICON}</Link>
    <Link href="/leaderboard">{LEADERBOARD_ICON}</Link>
    <Link href="/habit/add">{ADD_ICON}</Link>
  </footer>
);
