"use client";

import { FC, useEffect, useState } from "react";

const BELL_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M4.068,18H19.724a3,3,0,0,0,2.821-4.021L19.693,6.094A8.323,8.323,0,0,0,11.675,0h0A8.321,8.321,0,0,0,3.552,6.516l-2.35,7.6A3,3,0,0,0,4.068,18Z" />
    <path d="M7.1,20a5,5,0,0,0,9.8,0Z" />
  </svg>
);

type Props = {
  userId: string;
};

export const NotificationRedirect: FC<Props> = ({ userId }) => {
  const [permission, setPermission] = useState(true);

  useEffect(() => {
    console.log("Noti", { not: Notification, per: Notification.permission });

    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      setPermission(false);
    }
  }, []);

  const handleRequestPermission = () => {
    alert("hello");
    Notification.requestPermission().then((per) => {
      alert(JSON.stringify(per));

      if (per === "granted") {
        setPermission(true);
      } else {
        setPermission(false);
      }
    });
  };

  if (!userId) {
    return null;
  }

  if (permission) {
    return null;
  }

  return (
    <div
      className="flex bg-zinc-50 items-center p-4 gap-4 rounded-xl"
      onClick={handleRequestPermission}
    >
      {BELL_ICON}
      <p className="font-medium">Enable notifications</p>
    </div>
  );
};
