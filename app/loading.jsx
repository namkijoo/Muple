export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-[#2b2a2a]">
      <svg
        className="animate-spin h-10 w-10 text-white mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-sm text-gray-300">페이지를 불러오는 중입니다...</p>
    </div>
  );
}
