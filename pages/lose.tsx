'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Lose() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-yellow-200 flex items-start justify-center">
      <div className="bg-yellow-300 mt-5 border-[6px] border-yellow-800 p-12 shadow-xl flex flex-col items-center">
        <h1 className="text-[#4B2E14] text-4xl md:text-6xl lg:text-8xl pixel-font text-center leading-relaxed mb-10">
          GAME OVER
        </h1>
        <button
          onClick={() => {
            router.replace('/')           
          }}
          className="pixel-font text-[#4B2E14] border-4 border-yellow-800 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 transition-all duration-150"
        >
          back to game
        </button>
      </div>
    </div>
  );
}
