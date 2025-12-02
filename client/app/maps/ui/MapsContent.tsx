 "use client";

 import { useClerk } from "@clerk/nextjs";
 import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { World } from "@/lib/world";

 export default function MapsContent() {
   const { signOut } = useClerk();
   const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<World | null>(null);

   const handleLogout = async () => {
     await signOut();
     router.push("/signin");
   };

  useEffect(() => {
    if (!containerRef.current) return;

    const world = new World(containerRef.current);
    worldRef.current = world;

    world.init("/model.glb").then(() => {
      world.start();
    });

    return () => {
      world.stop();
      worldRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

   return (
     <div className="flex min-h-screen flex-col items-center justify-between bg-black px-4 py-6 text-white">
       <header className="flex w-full max-w-5xl items-center justify-between">
         <h1 className="text-xl font-semibold uppercase tracking-[0.2em] text-zinc-300">
           DOU360
         </h1>
         <button
           type="button"
           onClick={handleLogout}
           className="rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-1.5 text-sm text-zinc-200 shadow-lg shadow-black/40 transition hover:border-red-500 hover:text-red-400"
         >
           Logout
         </button>
       </header>

       <main className="flex w-full h-full flex-1 items-center justify-center">
        <div
          ref={containerRef}
          className="h-[700px] w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-2xl shadow-black/60"
        />
       </main>

       <footer className="mt-4 text-xs text-zinc-500">
         Click and drag to rotate · Scroll or pinch to zoom
       </footer>
     </div>
   );
 }
