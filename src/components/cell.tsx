import { getBackgroundColor } from "@/utils/backgroundColor";
import { GuessResultType, GuessType } from "@/utils/game";
interface CellProps {
  value?: GuessType;
  guessResultType?: GuessResultType | null;
}
export function Cell({ value, guessResultType }: CellProps) {
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
