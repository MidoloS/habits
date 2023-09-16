import { generatePrismaClient } from "./client";

const prisma = generatePrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "Subscriptions") {
    switch (params.action) {
      case "delete":
        await prisma.habit.update({
          where: {
            name: params.args.where.habitName,
          },
          data: {
            points: {
              decrement: 1,
            },
          },
        });
        break;
      case "create":
        await prisma.habit.update({
          where: {
            name: params.args.data.habitName,
          },
          data: {
            points: {
              increment: 1,
            },
          },
        });
        break;
    }
  }
  return next(params);
});
