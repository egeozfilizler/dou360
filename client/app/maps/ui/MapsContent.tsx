 "use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function MapsContent() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">maps page</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded bg-black px-4 py-2 text-white"
      >
        logout
      </button>
    </div>
  );
}


