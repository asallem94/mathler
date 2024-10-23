import { GameContext } from "@/provider/game";
import { getBackgroundColor } from "@/utils/backgroundColor";
import { GuessesResultType, GuessResultType, GuessType } from "@/utils/game";
import { useContext } from "react";

export const MAX_GUESSES = 6;
interface BoardProps {}
interface CellProps {
  value?: GuessType;
  guessResultType?: GuessResultType;
}
export function Board() {
  const { game, activeGuess } = useContext(GameContext);
  const guesses = game?.guesses || [];
  const remaningRows = MAX_GUESSES - guesses.length - 1;
  const hasActiveRow = guesses.length < MAX_GUESSES;
  return (
    <div className="flex flex-col justify-center py-1">
      {guesses.map((guessArg: GuessesResultType, rowIndex) => (
        <>
          <div className="flex justify-center py-1">
            {(guessArg[1] as GuessResultType[]).map(
              (guessResult: GuessResultType, index: number) => (
                <Cell
                  key={`guessed-${rowIndex}-${index}-${guessArg[0][index]}`}
                  value={guessArg[0][index]}
                  guessResultType={guessResult}
                />
              )
            )}
          </div>
        </>
      ))}
      {hasActiveRow ? (
        <div className="flex justify-center py-1">
          {activeGuess.split("").map((char, index) => (
            <Cell key={`active-guess-${index}-${char}`} value={char} />
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

function Cell({ value, guessResultType }: CellProps) {
  const colorBg = getBackgroundColor(guessResultType);
  const cell = (
    <div
      className={`text-xl w-14 h-10 border-solid border-2 flex items-center justify-center mx-0.5 font-bold rounded font-black ${colorBg} text-white border-${colorBg} absent cell-animation`}
    >
      {value}
    </div>
  );
  return cell;
}
