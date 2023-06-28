"use client";

import { subscribeToHabit, unsubscribeToHabit } from "@/libs/helpers";
import { FC } from "react";
import { FollowButton } from "./Follow";

type Props = {
  habitName: string;
  isFollowing?: boolean;
};

export const FollowHabitButton: FC<Props> = ({
  habitName,
  isFollowing = false,
}) => (
  <FollowButton
    isFollowing={isFollowing}
    onSubscribe={() =>
      subscribeToHabit({
        email: "midolo.1912@gmail.com",
        habitName,
      })
    }
    onUnsubscribe={() =>
      unsubscribeToHabit({
        email: "midolo.1912@gmail.com",
        habitName,
      })
    }
  />
);
