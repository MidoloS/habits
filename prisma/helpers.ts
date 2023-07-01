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
  return await prisma.habit.findUnique({
    where: {
      name,
    },
  });
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
  return await prisma.habit.findMany();
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
  console.log(email, habitName, "CREATE");

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
