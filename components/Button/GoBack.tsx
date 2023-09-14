import Link from "next/link";

const GoBackButton = () => {
  return (
    <Link
      href="/home"
      className="bg-slate-50  border border-slate-200 text-slate-950 p-4 rounded-lg flex items-center justify-center"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20.722"
        height="18.182"
        viewBox="0 0 20.722 18.182"
      >
        <path
          id="Path_92"
          data-name="Path 92"
          d="M19.5,13.5,12,21m0,0L4.5,13.5M12,21V3"
          transform="matrix(0.017, 1, -1, 0.017, 22.357, -3.12)"
          fill="none"
          stroke="#020617"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </Link>
  );
};

export default GoBackButton;
