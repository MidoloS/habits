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
        habitName,
      })
    }
    onUnsubscribe={() =>
      unsubscribeToHabit({
        habitName,
      })
    }
  />
);
