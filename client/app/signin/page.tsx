"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ColorBends from "@/components/ColorBends";

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!isLoaded || !signIn) return;
    
    await signIn.authenticateWithRedirect({
      strategy: "oauth_microsoft",
      redirectUrl: "/maps",
      redirectUrlComplete: "/maps",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          className="h-full w-full"
          colors={["#d70926", "#fff"]}
          rotation={10}
          autoRotate={-2}
          speed={0.3}
          scale={1.5}
          frequency={1.0}
          warpStrength={1.0}
          mouseInfluence={0.8}
          parallax={0.5}
          noise={0.1}
          transparent={true}
        />
      </div>

      {/* Gradient overlay to match soft look */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-6 sm:px-10 sm:py-8">
        {/* Center hero / sign-in call-to-action */}
        <main className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            You have the tools
            <br />
            to unlock your
            <br />
            full campus
          </h1>

          <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">
          The smartest way to find your route, discover hidden spots, and make the most of your university life.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={handleSignIn}
              disabled={!isLoaded}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:bg-zinc-100 hover:shadow-xl hover:shadow-black/50 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="h-4 w-4 text-black"
                >
                  <rect x="0" y="0" width="7" height="7" fill="currentColor" />
                  <rect x="8" y="0" width="7" height="7" fill="currentColor" />
                  <rect x="0" y="8" width="7" height="7" fill="currentColor" />
                  <rect x="8" y="8" width="7" height="7" fill="currentColor" />
                </svg>
              </span>
              <span>Sign in</span>
            </button>

            <button
              type="button"
              onClick={() => {
                router.prefetch("/learn-more");
                setTimeout(() => router.push("/learn-more"), 0);
              }}
              className="rounded-full border border-white/30 bg-black/40 px-8 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-black/60 hover:text-white active:scale-95"
            >
              Learn More
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}



