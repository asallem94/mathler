import { Game } from "@/utils/game";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface GameProviderProps {
  children: React.ReactNode;
  game: Game | null;
}

interface GameContextType {
  game: Game | null;
  activeGuess: string;
  setActiveGuess: Dispatch<SetStateAction<string>>;
}
export const GameContext = createContext<GameContextType>({
  game: null,
  activeGuess: "",
  setActiveGuess: () => {},
});

export const GameProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<Game | null>(null);

  const [activeGuess, setActiveGuess] = useState("");
  useEffect(() => {
    const initMathler = async () => {
      // add logic to save to localstorage to persist game activity
      const result = await fetch(`${location.origin}/api/mathler`).then((res) =>
        res.json()
      );
      const game: Game = new Game(result.expression, result.answer);
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
