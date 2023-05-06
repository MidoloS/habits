export const getHighestValueKey = (obj) => {
  let highestKey = null;
  let highestValue = 0;
  for (let [key, value] of Object.entries(obj)) {
    if (value > highestValue) {
      highestKey = key;
      highestValue = value;
    }
  }
  return highestKey;
};

export const pathToTitle = (path) => {
  const PATHS = {
    "/habit/:id": { title: "Create new Habit", subtitle: "Find new Goals" },
    "/habit/:id/scan": { title: "Take a Photo", subtitle: "We will validate" },
    "/habits": { title: "My Habits", subtitle: "" },
    "/leaderboard": { title: "Ranking", subtitle: "Top Players" },
    "/habit/add": { title: "Add Habit", subtitle: "Pick new a Habit" },
  };

  if (PATHS[path]) {
    return PATHS[path];
  }

  const FALLBACK_ROUTE = { title: "Not found", subtitle: "Missing page" };

  const matchedRoute = Object.keys(PATHS).find((route) => {
    const pattern = new RegExp(`^${route.replace(":id", "(\\w+)")}$`);
    return pattern.test(path);
  });

  if (matchedRoute) {
    const pattern = new RegExp(`^${matchedRoute.replace(":id", "(\\w+)")}$`);
    const params = pattern.exec(path);
    const title = PATHS[matchedRoute].title.replace(":id", params[1]);
    return { title, subtitle: PATHS[matchedRoute].subtitle };
  } else {
    return FALLBACK_ROUTE;
  }
};

export const subscribeToHabit = async ({ habitName, email }) => {
  const response = await fetch("/api/habit/subscribe/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ habitName, email }),
  });
  const data = await response.json();
  alert(JSON.stringify(data));
  return data;
};

export const unsubscribeToHabit = async ({ habitName, email }) => {
  const response = await fetch("/api/habit/subscribe/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ habitName, email }),
  });
  const data = await response.json();
  alert(JSON.stringify(data));
  return data;
};
