import { FC } from "react";

type Props = {
  strokeWidth: number;
  strokeColor?: string;
  percentage: number;
  size?: number;
  children?: React.ReactNode;
};

export const CircularProgressbar: FC<Props> = ({
  strokeWidth,
  strokeColor = "#fafafa",
  percentage,
  size = 32,
  children,
}) => {
  const radius = size - strokeWidth / 2;
  const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

  const diameter = Math.PI * 2 * radius;
  const progressStyle = {
    stroke: strokeColor,
    strokeLinecap: "round",
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
  };

  return (
    <svg
      className={"CircularProgressbar"}
      viewBox="0 0 100 100"
      width={100}
      height={100}
    >
      <path
        className="CircularProgressbar-trail"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: "#09090b",
        }}
      />

      <path
        className="CircularProgressbar-path"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        // @ts-ignore
        style={progressStyle}
      />

      {children ? (
        children
      ) : (
        <text
          className="CircularProgressbar-text"
          x={50}
          y={50}
          style={{
            fill: "#fafafa",
            fontSize: "14px",
            dominantBaseline: "central",
            textAnchor: "middle",
            fontWeight: "bold",
          }}
        >
          {Math.round(percentage)}%
        </text>
      )}
    </svg>
  );
};
