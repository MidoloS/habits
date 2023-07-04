import Link from "next/link";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  return (
    <Link
      className="bg-slate-200 text-slate-950 h-14 w-14 rounded-lg flex items-center justify-center"
      href="/"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26.809"
        height="23.286"
        viewBox="0 0 26.809 23.286"
      >
        <path
          id="Path_92"
          data-name="Path 92"
          d="M24.5,17l-10,10m0,0L4.5,17m10,10V3"
          transform="matrix(0.017, 1, -1, 0.017, 28.356, -3.12)"
          fill="none"
          stroke="#020617"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </Link>
  );
};

export default GoBackButton;
