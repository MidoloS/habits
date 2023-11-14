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

const sendMessageToSW = (json: object) => {
  navigator.serviceWorker.ready.then((registration) => {
    if (!registration.active) return;

    registration.active.postMessage(JSON.stringify(json));
  });
};

export const FollowButton: FC<Props> = ({ habitName }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getSubscription(habitName).then((sub) => {
      console.log({ sub });

      setIsFollowing(!!sub.data?.isFollowing);
    });
  }, [habitName]);

  const text = isFollowing ? "Following" : "Follow";

  const handleSubscribe = async (habitName: string) => {
    try {
      const res = await subscribeToHabit(habitName);
      console.log("res", res);

      // @ts-ignore
      if (!!res?.error) {
        // @ts-ignore
        toast.error(res?.error);
        return;
      }

      setIsFollowing(true);
      toast.success("Successfully subscribed!");
      sendMessageToSW({
        isFollowing: true,
        name: habitName,
      });
    } catch (error) {
      await handleUnsubscribe(habitName);
      setIsFollowing(false);
      toast.error("Couldn't follow habit");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (habitName: string) => {
    try {
      const res = await unsubscribeToHabit(habitName);
      console.log("res", res);

      // @ts-ignore
      if (!!res?.error) {
        // @ts-ignore
        toast.error(res?.error);
        return;
      }

      setIsFollowing(false);
      toast.success("Successfully unsubscribed!");
      sendMessageToSW({
        isFollowing: false,
        name: habitName,
      });
    } catch (error) {
      await handleSubscribe(habitName);
      setIsFollowing(true);
      toast.error("Couldn't unfollow habit");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);

    if (isFollowing) {
      handleUnsubscribe(habitName);
    } else {
      handleSubscribe(habitName);
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
