import { HabitName } from "@prisma/client";
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

export const getHabit = async (name: HabitName) => {
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
  habitName: HabitName;
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
