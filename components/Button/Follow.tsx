"use client";

import {
  getSubscription,
  subscribeToHabit,
  unsubscribeToHabit,
} from "@/libs/helpers";
import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PrimaryButton } from "./Primary";
import { CheckmarkIcon } from "../Icon/Check";

type Props = {
  habitName: string;
};

export const FollowButton: FC<Props> = ({ habitName }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getSubscription(habitName).then((sub) => {
      setIsFollowing(!!sub.data);
    });
  }, [habitName]);

  const text = isFollowing ? "Following" : "Follow";

  const handleClick = () => {
    setLoading(true);

    if (isFollowing) {
      unsubscribeToHabit(habitName)
        .then(() => {
          setIsFollowing(false);
          setLoading(false);
          toast.success("Successfully unsubscribed!");
          navigator.serviceWorker.ready.then((registration) => {
            if (!registration.active) return;

            registration.active.postMessage(
              JSON.stringify({
                type: "UNFOLLOW_HABIT",
                name: habitName,
              })
            );
          });
        })
        .catch(() => {
          setLoading(false);
          setIsFollowing(true);
          toast.error("Something went wrong!");
        });
    } else {
      subscribeToHabit(habitName)
        .then(() => {
          setIsFollowing(true);
          setLoading(false);
          toast.success("Successfully subscribed!");
          navigator.serviceWorker.ready.then((registration) => {
            if (!registration.active) return;

            registration.active.postMessage(
              JSON.stringify({
                type: "FOLLOW_HABIT",
                name: habitName,
              })
            );
          });
        })
        .catch(() => {
          setIsFollowing(false);
          setLoading(false);
          toast.error("Something went wrong!");
        });
    }
  };

  return (
    <>
      <Toaster />
      <PrimaryButton
        onClick={handleClick}
        isLoading={loading}
        isActive={isFollowing}
        icon={<CheckmarkIcon />}
        fullWidth={false}
      >
        {text}
      </PrimaryButton>
    </>
  );
};
