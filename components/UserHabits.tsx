"use client";

import { useSession } from "next-auth/react";

const UserHabits = () => {
  const { data: session } = useSession({
    required: true,
  });
};
