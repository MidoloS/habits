"use client";

import { useState } from "react";
import { Switch } from "./Switch";
// import { requestPermission } from "@/firebase/helpers";

export const EnableNotification = () => {
  return (
    <div className="absolute">
      <div className="bg-slate-950 flex justify-between items-center p-4 rounded-lg w-screen">
        <div className="flex flex-col gap-1">
          <h3 className="text-slate-50 font-medium">
            Wanna improve your habits?
          </h3>
          <p className="text-slate-300 text-sm">Enable Daily Reminder</p>
        </div>
        <div>{/* <Switch onClick={requestPermission} /> */}</div>
      </div>
    </div>
  );
};
