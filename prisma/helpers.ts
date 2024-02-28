import { Habit, User } from "@prisma/client";
import { generatePrismaClient } from "./client";

const prisma = generatePrismaClient();

export const getUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      subscriptions: {
        where: {
          isFollowing: true,
        },
        include: {
          habit: true,
        },
      },
    },
  });
};

export const getUserHabits = async (email: string) =>
  prisma.subscriptions.findMany({
    where: {
      userEmail: email,
    },
  });

export const getHabit = async (name: string) => {
  const habit = await prisma.habit.findUnique({
    where: {
      name,
    },
  });

  if (!habit) {
    return {
      data: {} as Habit,
      error: "Habit not found",
      status: 404,
    };
  }

  return {
    data: habit,
    error: null,
    status: 200,
  };
};

export const completeHabit = async ({
  email,
  habitName,
}: {
  email: string;
  habitName: string;
}) => {
  const sub = await prisma.subscriptions.findUnique({
    where: {
      userEmail_habitName: {
        habitName,
        userEmail: email,
      },
    },
    include: {
      habit: true,
    },
  });

  const xpBoost = 1 + (sub?.streak || 1) / 10;

  console.log({ xpBoost });

  return prisma.user.update({
    where: {
      email,
    },
    data: {
      points: {
        increment: (sub?.habit?.points || 1) * xpBoost,
      },
      subscriptions: {
        update: {
          where: {
            userEmail_habitName: {
              habitName,
              userEmail: email,
            },
          },
          data: {
            completedAt: new Date(),
            streak: {
              increment: 1,
            },
          },
        },
      },
    },
  });
};

export const getHabits = async () => {
  const habits = await prisma.habit.findMany();

  if (!habits.length) {
    return {
      data: [] as Habit[],
      error: "Habits not found",
      status: 404,
    };
  }

  return {
    data: habits,
    error: null,
    status: 200,
  };
};

export const deleteSubscriptions = async ({
  email,
  habitName,
}: {
  email: string;
  habitName: string;
}) => {
  return prisma.habit.update({
    where: {
      name: habitName,
    },
    data: {
      followersQty: {
        decrement: 1,
      },
      subscriptions: {
        update: {
          where: {
            userEmail_habitName: {
              habitName,
              userEmail: email,
            },
          },
          data: {
            isFollowing: false,
          },
        },
      },
    },
  });
};

export const createSubscriptions = async ({
  email,
  habitName,
}: {
  email: string;
  habitName: string;
}) => {
  return prisma.habit.update({
    where: {
      name: habitName,
    },
    data: {
      followersQty: {
        increment: 1,
      },
      subscriptions: {
        upsert: {
          where: {
            userEmail_habitName: {
              habitName,
              userEmail: email,
            },
          },
          create: {
            userEmail: email,
          },
          update: {
            isFollowing: true,
          },
        },
      },
    },
  });
};

export const createUser = async ({
  email,
  name,
  img,
}: {
  email: string | undefined;
  name: string | undefined;
  img: string | undefined;
}) => {
  if (!email || !name) {
    return null;
  }

  try {
    return prisma.user.upsert({
      where: {
        email,
      },
      create: {
        email,
        name,
        img,
      },
      update: {
        email,
        name,
        img,
      },
    });
  } catch (err) {
    return null;
  }
};

export const getUserById = (id: string) => {
  if (!id) {
    return null;
  }

  try {
    return prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        subscriptions: true,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getUserRank = (user: User) => {
  if (!user) {
    return undefined;
  }
  return prisma.user.count({
    where: {
      points: { gte: user.points },
    },
  });
};

export const getSubscription = async ({
  habitName,
  email,
}: {
  habitName: string;
  email: string;
}) => {
  return prisma.subscriptions.findUnique({
    where: {
      userEmail_habitName: {
        habitName,
        userEmail: email,
      },
    },
    include: {
      habit: true,
    },
  });
};

export const getSubscriptions = async ({ email }: { email: string }) => {
  return prisma.subscriptions.findMany({
    where: {
      userEmail: email,
      isFollowing: true,
    },
    include: {
      habit: true,
    },
    orderBy: {
      completedAt: "desc",
    },
  });
};
