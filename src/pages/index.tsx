import Image from "next/image";
import localFont from "next/font/local";
import { Instructions } from "@/components/instructions";
import { Board } from "@/components/board";
import { Controls } from "@/components/controls";
import { useContext, useEffect, useState } from "react";
import { Game } from "@/utils/game";
import { GameContext, GameProvider } from "@/provider/game";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export default function AppWrapper() {
  return (
    <GameProvider game={null}>
      <App />
    </GameProvider>
  );
}

function App() {
  const { game } = useContext(GameContext);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex">
          <Image src="/logo.svg" alt="mathler logo" width={25} height={25} />
          <Image src="/mathler.svg" alt="mathler" width={150} height={10} />
        </div>
        <h2 className="text-lg grow text-center">
          Find the hidden calculation{" "}
          <span className="bg-[#FCEB4E] no-darkmode rounded px-0.5 text-black">
            that equals {game?.answer}
          </span>
        </h2>
        <Board />
        <Controls />
      </main>
      <ToastContainer />
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* <Instructions /> */}
      </footer>
    </div>
  );
}
