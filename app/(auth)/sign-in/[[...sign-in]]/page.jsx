import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[600px] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
