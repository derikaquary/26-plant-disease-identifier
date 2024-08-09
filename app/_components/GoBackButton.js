"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/article_and_tips");
  };

  return (
    <div className="absolute top-5 left-5">
      <button
        onClick={handleGoBack}
        className="flex items-center text-white bg-gray-800/60 px-3 py-2 rounded-lg shadow-md">
        <FaArrowLeft size={20} />
        <span className="ml-2">Back</span>
      </button>
    </div>
  );
}

export default GoBackButton;
