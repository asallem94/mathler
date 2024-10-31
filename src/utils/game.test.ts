import { Game, GroupingType } from "./game";

describe("game play functions", () => {
  it("gets grouping from expression", () => {
    const grouping1 = Game.getExpressionGrouping("4/2*5+3");
    const result1 = ["+", ["*", ["/", "4", "2"], "5"], "3"];
    expect(grouping1).toEqual(result1);
    const result2 = ["+", ["+", "2", "5"], "8"];
    const grouping2 = Game.getExpressionGrouping("2+5+8");
    expect(grouping2).toEqual(result2);
  });
  it("gets alternate expression from grouping", () => {
    const grouping: GroupingType = [
      "+",
      ["*", ["/", "4", "2"], "5"],
      ["*", "7", "6"],
    ];
    const alternateExpressionResult = Game.getExpressionCombinations(grouping);
    const expectedAlternateExpressions = [
      "4/2*5+7*6",
      "4/2*5+6*7",
      "5*4/2+7*6",
      "5*4/2+6*7",
      "7*6+4/2*5",
      "6*7+4/2*5",
      "7*6+5*4/2",
      "6*7+5*4/2",
    ];
    expect(expectedAlternateExpressions).toEqual(alternateExpressionResult);
  });
  it("gets alternative expression from main expression", () => {
    const game = new Game("4/2*5+3", 13);
    const expectedAlternateExpressions = [
      "4/2*5+3",
      "5*4/2+3",
      "3+4/2*5",
      "3+5*4/2",
    ];
    expect(game.calculateAlternateExpressions()).toEqual(
      expectedAlternateExpressions
    );
  });
  it("submits an incorrect guess", () => {
    const game = new Game("4/2*5+3", 13);
    expect(game.gameResults).toEqual(null);
    game.guess("29-10-6");
    expect(game.gameResults).toEqual(null);
    expect(game.guesses).toEqual([["29-10-6", [2, 0, 0, 0, 0, 0, 0]]]);
    expect(game.guessedValues).toEqual({
      "0": 0,
      "1": 0,
      "2": 2,
      "3": null,
      "4": null,
      "5": null,
      "6": 0,
      "7": null,
      "8": null,
      "9": 0,
      "+": null,
      "-": 0,
      "*": null,
      "/": null,
    });
  });
  it("submits a winning guess", () => {
    const game = new Game("4/2*5+3", 13);
    expect(game.gameResults).toEqual(null);
    game.guess("4/2*5+3");
    expect(game.guesses).toEqual([["4/2*5+3", [1, 1, 1, 1, 1, 1, 1]]]);
    expect(game.gameResults).toEqual(1);
  });
});
