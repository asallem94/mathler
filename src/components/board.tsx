import { GameContext } from "@/provider/game";
import { GuessResultType, GuessType } from "@/utils/game";
import { useContext } from "react";
import { Cell } from "./cell";

export const MAX_GUESSES = 6;
export function Board() {
  const { game, activeGuess } = useContext(GameContext);
  const guesses = game?.guesses || [];
  const remaningRows = MAX_GUESSES - guesses.length - 1;
  const hasActiveRow = guesses.length < MAX_GUESSES;
  console.log({ guesses });
  return (
    <div className="flex flex-col justify-center py-1">
      {guesses.map((guessArg, rowIndex: number) => (
        <div className="flex justify-center py-1">
          {guessArg[1].map((guessResult: GuessResultType, index: number) => (
            <Cell
              key={`guessed-${rowIndex}-${index}-${guessArg[0][index]}`}
              value={guessArg[0][index] as GuessType}
              guessResultType={guessResult}
            />
          ))}
        </div>
      ))}
      {hasActiveRow ? (
        <div className="flex justify-center py-1">
          {activeGuess.split("").map((char: string, index: number) => (
            <Cell
              key={`active-guess-${index}-${char}`}
              value={char as GuessType}
            />
          ))}
          {Array.from(Array(6 - activeGuess.length).keys()).map((_, index) => (
            <Cell key={`active-remaining-${index}`} />
          ))}
        </div>
      ) : null}
      <div>
        {Array.from(Array(remaningRows).keys()).map((_, rowIndex: number) => (
          <div
            key={`remaning-row-${rowIndex}`}
            className="flex justify-center py-1"
          >
            {Array.from(Array(6).keys()).map((_, colIndex) => {
              return <Cell key={`remaning-cell-${rowIndex}-${colIndex}`} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
