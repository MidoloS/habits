export const subscribeToHabit = async ({ habitName }) => {
  const response = await fetch(`/api/habit/subscribe/${habitName}`, {
    method: "POST",
  });
  const data = await response.json();
  alert(JSON.stringify(data));
  return data;
};

export const unsubscribeToHabit = async ({ habitName }) => {
  const response = await fetch(`/api/habit/unsubscribe/${habitName}`, {
    method: "DELETE",
  });
  const data = await response.json();
  alert(JSON.stringify(data));
  return data;
};
