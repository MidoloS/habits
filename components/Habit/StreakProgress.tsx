import { FC } from "react";
import { CircularProgressbar } from "../Info/CircularProgressBar";
import { DAYS_UNTIL_HABIT } from "@/libs/constants";

type Props = {
  streakDays: number;
  isRanked: boolean;
};

export const StreakProgress: FC<Props> = ({ streakDays, isRanked }) => {
  const percentage = (1 / DAYS_UNTIL_HABIT) * 100;
  const totalBoost = streakDays * 10;

  const isCompleted = streakDays === DAYS_UNTIL_HABIT;
  const message = isCompleted
    ? `Habit Completed!`
    : `${DAYS_UNTIL_HABIT - streakDays} days left`;

  const color = isCompleted ? "#E9B230" : "#fafafa";

  const textBoost = isRanked ? `${totalBoost}% Boost Points` : "No Boost";

  return (
    <div className="flex items-center">
      <CircularProgressbar
        percentage={percentage}
        strokeWidth={5}
        strokeColor="#E9B230"
      >
        <path
          d="M33.661,2.613c-.71-.6-1.454-1.234-2.211-1.923A2.662,2.662,0,0,0,29.305.021a2.566,2.566,0,0,0-1.833,1.172,18.373,18.373,0,0,0-2.247,5.816,5.524,5.524,0,0,1-.429-.735,1.8,1.8,0,0,0-2.976-.427,8.176,8.176,0,0,0-2.332,5.791A9.9,9.9,0,0,0,26.9,21.317a10.508,10.508,0,0,0,2.5.317c.027,0,.315,0,.431-.011a9.973,9.973,0,0,0,9.65-9.98C39.484,7.558,36.785,5.268,33.661,2.613ZM29.384,19.825a3.4,3.4,0,0,1-1.835-.727,3.355,3.355,0,0,1-1.427-2.306c-.153-1.463.749-3.376,2.591-5.536h0a1.011,1.011,0,0,1,.773-.354h0a.982.982,0,0,1,.76.352c1.688,2,2.615,3.853,2.615,5.206A3.421,3.421,0,0,1,29.7,19.816,1.711,1.711,0,0,1,29.384,19.825Zm5.131-1.715c-.053.041-.112.075-.166.115a5.146,5.146,0,0,0,.317-1.766c0-2.279-1.655-4.721-3.042-6.369A2.8,2.8,0,0,0,29.49,9.1h0a2.811,2.811,0,0,0-2.143.986h0c-2.205,2.583-3.218,4.9-3.01,6.9a4.666,4.666,0,0,0,.351,1.344,8.2,8.2,0,0,1-3.389-6.685,6.369,6.369,0,0,1,1.879-4.581,7.366,7.366,0,0,0,.746,1.227,1.666,1.666,0,0,0,1.719.631,1.714,1.714,0,0,0,1.309-1.329,16.824,16.824,0,0,1,2.046-5.431.759.759,0,0,1,.549-.346.86.86,0,0,1,.694.217c.774.7,1.533,1.353,2.255,1.963,3.01,2.557,5.187,4.4,5.187,7.654a8.146,8.146,0,0,1-3.16,6.467Z"
          fill={color}
          transform="translate(20, 38)"
        />
      </CircularProgressbar>
      <div>
        <p className="text-sm text-zinc-500">{message}</p>
        <h2 className="text-lg text-zinc-50 font-semibold">{textBoost}</h2>
      </div>
    </div>
  );
};
