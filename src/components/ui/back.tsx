import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <a
      className="h-5 w-5 p-1 cursor-pointer hover:scale-75"
      onClick={() => {
        router.back();
      }}
    >
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </a>
  );
}
