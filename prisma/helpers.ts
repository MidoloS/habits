import { Habit } from "@prisma/client";
import { generatePrismaClient } from "./client";

const prisma = generatePrismaClient();

export const getUserHabits = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      subscriptions: {
        include: {
          habit: true,
        },
      },
    },
  });
};

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
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      subscriptions: {
        update: {
          where: {
            userEmail_habitName: {
              habitName,
              userEmail: email,
            },
          },
          data: {
            createdAt: new Date(),
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
  console.log(email, habitName, "DELETE");

  return prisma.habit.update({
    where: {
      name: habitName,
    },
    data: {
      followersQty: {
        decrement: 1,
      },
      subscriptions: {
        delete: {
          userEmail_habitName: {
            habitName,
            userEmail: email,
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
        create: {
          userEmail: email,
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
  console.log({ email, name });

  if (!email || !name) {
    return null;
  }
  console.log(1);

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
    console.log(err);

    return null;
  }
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
    },
    include: {
      habit: true,
    },
  });
};
