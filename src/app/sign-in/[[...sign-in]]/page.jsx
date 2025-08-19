import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn />
      </div>
    </>
  );
}
