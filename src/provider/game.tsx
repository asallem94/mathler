import { Game } from "@/utils/game";
import { createContext, useEffect, useState } from "react";

interface GameProviderProps {
  children: React.ReactNode;
  game: Game | null;
}
export const GameContext = createContext<Game | null>("GameContext");

export const GameProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<{
    game: Game | null;
    activeGuess: string;
    setActiveGuess: any;
  }>();

  const [activeGuess, setActiveGuess] = useState("");
  useEffect(() => {
    const initMathler = async () => {
      // add logic to save to localstorage to persist game activity
      const result = await fetch("http://localhost:3000/api/mathler").then(
        (res) => res.json()
      );
      const game = new Game(result.expression, result.answer);
      setGame(game);
    };
    initMathler();
  }, []);
  return (
    <GameContext.Provider value={{ game, activeGuess, setActiveGuess }}>
      {children}
    </GameContext.Provider>
  );
};
