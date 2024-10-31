import { GameContext } from "@/provider/game";
import { getBackgroundColor } from "@/utils/backgroundColor";
import { GuessType } from "@/utils/game";
import { useContext } from "react";
import { toast } from "react-toastify";

const CONTROLS_R1 = Array.from(Array(10).keys());
const CONTROLS_R2 = ["ENTER", "+", "-", "*", "/", "DELETE"];

export function Controls() {
  const { game, setActiveGuess, activeGuess } = useContext(GameContext);
  const guessedValues = game?.guessedValues;
  const onPress = (value: string) => () => {
    if (value === "ENTER") {
      try {
        game?.guess(activeGuess);
        setActiveGuess("");
      } catch (error: unknown) {
        toast((error as Error).message);
      }
    } else if (value === "DELETE") {
      setActiveGuess((prevGuess: string) => {
        if (prevGuess.length === 0) {
          return "";
        }
        return prevGuess.slice(0, prevGuess.length - 1);
      });
    } else {
      setActiveGuess((prevGuess: string) => {
        if (prevGuess.length === 6) {
          return prevGuess;
        }
        return prevGuess + value;
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center">
        {CONTROLS_R1.map((label) => (
          <button
            data-testid={label.toString()}
            disabled={game?.gameResults !== null}
            onClick={onPress(label.toString())}
            className={`flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer select-none text-xl ${getBackgroundColor(
              guessedValues?.[label as unknown as GuessType]
            )}  hover:bg-[#BBC8D6] active:${getBackgroundColor(
              guessedValues?.[label as unknown as GuessType]
            )} text-black`}
            key={label}
            style={buttonStyle}
          >
            {label.toString()}
          </button>
        ))}
      </div>
      <div className="flex justify-center py-2">
        {CONTROLS_R2.map((label) => (
          <button
            data-testid={label.toString()}
            disabled={game?.gameResults !== null}
            onClick={onPress(label.toString())}
            className={`flex items-center justify-center rounded mx-0.5 font-bold cursor-pointer select-none text-xl ${
              label === "ENTER" || label === "DELETE"
                ? "bg-[#727F93]"
                : getBackgroundColor(
                    guessedValues?.[label as unknown as GuessType]
                  )
            }  hover:bg-[#BBC8D6] active:${
              label === "ENTER" || label === "DELETE"
                ? "bg-[#727F93]"
                : getBackgroundColor(
                    guessedValues?.[label as unknown as GuessType]
                  )
            } text-black`}
            style={label.length > 1 ? textButtonStyle : buttonStyle}
            key={label}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
const buttonStyle = { width: 40, height: 50 };

const textButtonStyle = { width: 120, height: 50 };
