"use client";

import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <>
      <button
        className="shadow-md border-slate-200 rounded-lg p-4 text-sm bg-white"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <svg
          id="exit"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            id="Path_93"
            data-name="Path 93"
            d="M18.371,8.129,15.461,5.22A.75.75,0,1,0,14.4,6.28L17.31,9.19a1.543,1.543,0,0,1,.225.293c-.011,0-.02-.006-.032-.006h0L5.739,9.5a.75.75,0,1,0,0,1.5h0l11.76-.024c.021,0,.038-.01.059-.012a1.5,1.5,0,0,1-.251.346L14.4,14.22a.75.75,0,1,0,1.061,1.061l2.91-2.909a3,3,0,0,0,0-4.242Z"
            transform="translate(-1.247 -1.25)"
            fill="#0f172a"
          />
          <path
            id="Path_94"
            data-name="Path 94"
            d="M5.251,16.5h-1.5A2.25,2.25,0,0,1,1.5,14.25V3.75A2.25,2.25,0,0,1,3.751,1.5h1.5a.75.75,0,1,0,0-1.5h-1.5A3.755,3.755,0,0,0,0,3.75v10.5A3.755,3.755,0,0,0,3.751,18h1.5a.75.75,0,1,0,0-1.5Z"
            fill="#0f172a"
          />
        </svg>
      </button>
    </>
  );
};
