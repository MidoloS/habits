import Link from "next/link";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  return (
    <Link
      className="bg-black opacity-80 text-white h-14 w-14 rounded-lg flex items-center justify-center"
      href="/"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.518"
        height="18.536"
        viewBox="0 0 10.518 18.536"
      >
        <path
          id="Path_62"
          data-name="Path 62"
          d="M15.75,19.5,8.25,12l7.5-7.5"
          transform="translate(-7 -2.732)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </Link>
  );
};

export default GoBackButton;
