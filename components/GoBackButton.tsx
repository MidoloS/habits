"use client";

import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      className="bg-black text-white py-3 px-5 rounded-lg"
      onClick={handleBack}
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
