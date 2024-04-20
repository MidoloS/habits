import { Habit, Subscriptions, User } from "@prisma/client";
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

export type SubscriptionWithHabit = Subscriptions & {
  habit: Habit;
};

export const addBadge = async ({
  sub,
  email,
}: {
  sub: SubscriptionWithHabit;
  email: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log(sub, email);

  const userRange = (await getUserRank(user?.points || 0)) || 0;

  if (userRange <= 10) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "TOP_RANKER",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "TOP_RANKER",
      },
    });
  }

  if (user?.points || 0 >= 2000) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "COLLECTOR",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "COLLECTOR",
      },
    });
  }

  if (user?.points || 0 >= 6969) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "NICE",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "NICE",
      },
    });
  }

  if (user?.points || 0 >= 10000) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "MARATHONER",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "MARATHONER",
      },
    });
  }

  if (user?.points || 0 >= 10000) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "MARATHONER",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "MARATHONER",
      },
    });
  }

  if (sub?.streak || 0 >= 21) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "ON_STREAK",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "ON_STREAK",
      },
    });
  }

  if (sub?.streak || 0 >= 100) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "ON_FIRE",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "ON_FIRE",
      },
    });
  }
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

  await addBadge({
    email,
    // @ts-ignore
    sub,
  });

  const xpBoost = 1 + (sub?.streak || 1) / 10;

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
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      subscriptions: true,
    },
  });

  if (user?.subscriptions.length || 0 >= 0) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "FIRST_STEPS",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "FIRST_STEPS",
      },
    });
  }

  if (user?.subscriptions.length || 0 >= 2) {
    await prisma.badgeOfUser.upsert({
      where: {
        userEmail_badgeTitle: {
          badgeTitle: "CONNOISSEUR",
          userEmail: email,
        },
      },
      update: {},
      create: {
        userEmail: email,
        badgeTitle: "CONNOISSEUR",
      },
    });
  }

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
    const userCount = await prisma.user.count();

    const wea = await prisma.user.upsert({
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

    if (userCount <= 1000) {
      await prisma.badgeOfUser.upsert({
        where: {
          userEmail_badgeTitle: {
            badgeTitle: "PIOONER",
            userEmail: email,
          },
        },
        update: {},
        create: {
          userEmail: email,
          badgeTitle: "PIOONER",
        },
      });
    }

    return wea;
  } catch (err) {
    console.log({ err });

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

export const getUserRank = (userPoints: number) => {
  if (!userPoints) {
    return 0;
  }
  return prisma.user.count({
    where: {
      points: { gte: userPoints },
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
