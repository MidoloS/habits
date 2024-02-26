"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const HomeIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24.005"
      viewBox="0 0 24 24.005"
    >
      <path
        id="house-chimney-blank_1_"
        data-name="house-chimney-blank (1)"
        d="M22,5.735V1.987a1,1,0,0,0-2,0V4.366L14.8.855A4.981,4.981,0,0,0,9.2.855l-7,4.724A4.99,4.99,0,0,0,0,9.724V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9.724a4.988,4.988,0,0,0-2-3.989Z"
        transform="translate(0 0.005)"
        fill="#fafafa"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24.004"
      viewBox="0 0 24 24.004"
    >
      <path
        id="house-chimney-blank"
        d="M22,5.724V1.987a1,1,0,0,0-2,0V4.366L14.8.855A4.981,4.981,0,0,0,9.2.855l-7,4.724A4.99,4.99,0,0,0,0,9.724V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9.724a4.992,4.992,0,0,0-2-4ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9.724A2.992,2.992,0,0,1,3.322,7.238l7-4.724a2.982,2.982,0,0,1,3.356,0l7,4.724A2.994,2.994,0,0,1,22,9.724V19Z"
        transform="translate(0 0.004)"
        fill="#71717a"
      />
    </svg>
  );

export const LeaderboardIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23.642"
      height="23.966"
      viewBox="0 0 23.642 23.966"
      fill="#fafafa"
    >
      <g
        id="chart-pyramid_1_"
        data-name="chart-pyramid (1)"
        transform="translate(-0.179 -0.034)"
      >
        <path
          id="Path_46"
          data-name="Path 46"
          d="M.587,18.24A4,4,0,0,0,4.179,24H19.82a4,4,0,0,0,3.593-5.76L22.806,17H1.194Z"
        />
        <path
          id="Path_47"
          data-name="Path 47"
          d="M19.377,10H4.623L2.174,15H21.826Z"
        />
        <path
          id="Path_48"
          data-name="Path 48"
          d="M15.593,2.275a4,4,0,0,0-7.185,0L5.6,8H18.4Z"
        />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        id="chart-pyramid"
        d="M23.765,18.266,15.826,2.278a4.085,4.085,0,0,0-7.294,0L.593,18.266a3.959,3.959,0,0,0,.2,3.882A4.074,4.074,0,0,0,4.24,24.034H20.117a4.074,4.074,0,0,0,3.446-1.886,3.959,3.959,0,0,0,.2-3.883Zm-3.871-3.245H4.464l2.487-5.007H17.407ZM10.352,3.159a2.043,2.043,0,0,1,3.646,0l2.413,4.852H7.946ZM21.837,21.085a2,2,0,0,1-1.726.943H4.24a2.037,2.037,0,0,1-1.726-.941,1.979,1.979,0,0,1-.1-1.943l1.058-2.12H20.887l1.054,2.123a1.941,1.941,0,0,1-.1,1.941Z"
        transform="translate(-0.179 -0.034)"
        fill="#71717a"
      />
    </svg>
  );

export const AddHabitIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <svg
      id="apps-add_2_"
      data-name="apps-add (2)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        id="Path_32"
        data-name="Path 32"
        d="M4,0H7a4,4,0,0,1,4,4V7a4,4,0,0,1-4,4H4A4,4,0,0,1,0,7V4A4,4,0,0,1,4,0Z"
        fill="#fafafa"
      />
      <path
        id="Path_33"
        data-name="Path 33"
        d="M4,277.333H7a4,4,0,0,1,4,4v3a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4v-3A4,4,0,0,1,4,277.333Z"
        transform="translate(0 -264.333)"
        fill="#fafafa"
      />
      <path
        id="Path_34"
        data-name="Path 34"
        d="M281.334,277.333h3a4,4,0,0,1,4,4v3a4,4,0,0,1-4,4h-3a4,4,0,0,1-4-4v-3A4,4,0,0,1,281.334,277.333Z"
        transform="translate(-264.334 -264.333)"
        fill="#fafafa"
      />
      <path
        id="Path_35"
        data-name="Path 35"
        d="M278.334,27.334h3v3a1,1,0,1,0,2,0v-3h3a1,1,0,1,0,0-2h-3v-3a1,1,0,1,0-2,0v3h-3a1,1,0,1,0,0,2Z"
        transform="translate(-264.334 -20.334)"
        fill="#fafafa"
      />
    </svg>
  ) : (
    <svg
      id="apps-add_1_"
      data-name="apps-add (1)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        id="Path_28"
        data-name="Path 28"
        d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"
        fill="#71717a"
      />
      <path
        id="Path_29"
        data-name="Path 29"
        d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"
        fill="#71717a"
      />
      <path
        id="Path_30"
        data-name="Path 30"
        d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"
        fill="#71717a"
      />
      <path
        id="Path_31"
        data-name="Path 31"
        d="M14,7h3v3a1,1,0,0,0,2,0V7h3a1,1,0,0,0,0-2H19V2a1,1,0,0,0-2,0V5H14a1,1,0,0,0,0,2Z"
        fill="#71717a"
      />
    </svg>
  );

export const ProfileIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="#fafafa"
    >
      <g>
        <circle cx="256" cy="128" r="128" />
        <path d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z" />
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="#71717a">
      <path
        fill="#71717a"
        d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"
      />
      <path
        fill="#71717a"
        d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"
      />
    </svg>
  );

type Props = {
  userId: string;
};

export const Navigator: FC<Props> = ({ userId }) => {
  const path = usePathname();
  const isHome = path === "/home";
  const isLeaderboard = path === "/leaderboard";
  const isAddHabit = path === "/habit/new";
  const isProfile = path === "/user/" + userId;

  console.log({ isProfile });

  return (
    <footer className="fixed p-5 bg-zinc-950 border-t border-zinc-600 bottom-0 flex justify-between w-full items-center">
      <div className="container mx-auto flex  justify-between w-full items-center px-7">
        <Link href="/home" aria-label="home">
          <HomeIcon isActive={isHome} />
        </Link>
        <Link href="/leaderboard" aria-label="leaderboard">
          <LeaderboardIcon isActive={isLeaderboard} />
        </Link>
        <Link href="/habit/new" aria-label="new-habit">
          <AddHabitIcon isActive={isAddHabit} />
        </Link>
        <Link href={`/user/${userId}`} aria-label="profile">
          <ProfileIcon isActive={isProfile} />
        </Link>
      </div>
    </footer>
  );
};
