"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Always trigger transition on pathname change
    setIsTransitioning(true);
    setIsLoading(true);
    setIsFadingIn(false);
    setIsFadingOut(false);
    setProgress(0);

    // Trigger fade in after a brief moment
    setTimeout(() => setIsFadingIn(true), 10);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1.5;
      });
    }, 30);

    const timer = setTimeout(() => {
      setProgress(100);
      clearInterval(interval);
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setDisplayChildren(children);
          setIsLoading(false);
          setIsTransitioning(false);
        }, 600);
      }, 200);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [pathname, children]);

  if (isLoading) {
    return (
      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-all duration-500 ease-in-out ${
          isFadingOut ? 'opacity-0' : isFadingIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className={`flex items-center gap-1 transition-all duration-500 ease-in-out ${
          isFadingOut ? 'opacity-0 scale-90' : isFadingIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <span className="text-5xl font-bold text-[#d70926]">
            {Math.round(progress)}
          </span>
          <span className="text-5xl font-bold text-white">%</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {displayChildren}
    </div>
  );
}
