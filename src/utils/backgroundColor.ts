import { GuessResultType } from "./game";

const BACKGROUND_COLORS = ["bg-gray-500", "bg-green-500", "bg-yellow-600"];

export function getBackgroundColor(guessResultType?: GuessResultType | null) {
  if (guessResultType === undefined || guessResultType === null) {
    return guessResultType === null ? "bg-[#d4ddeb]" : "transparent";
  } else {
    return BACKGROUND_COLORS[guessResultType];
  }
}
