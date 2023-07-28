function timeUntil12UTC() {
  const nowTimestamp = Date.now();
  const twelveUTC = new Date();
  twelveUTC.setUTCHours(24, 0, 0, 0);
  const twelveUTCTimestamp = twelveUTC.getTime();
  const timeRemainingMs = twelveUTCTimestamp - nowTimestamp;

  const secondsRemaining = Math.floor(timeRemainingMs / 1000) % 60;
  const minutesRemaining = Math.floor(timeRemainingMs / (1000 * 60)) % 60;
  const hoursRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60));

  return {
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining,
  };
}
export const CountdownHabit = () => {
  return (
    <p className="text-center text-slate-500">Habits reset at 12PM UTC.</p>
  );
};
