export type GuessResultType = 0 | 1 | 2; // 0 is incorrect; 1 is correct guess and postion; 2 is correct guess but incorrect position
export type GuessesResultType = (string | GuessResultType[])[];
export type GuessType =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "+"
  | "-"
  | "*"
  | "/";
export class Game {
  gameResults: null | 1 | 0; // 1 is won and 0 is lost
  guesses: GuessesResultType;
  guessedValues: Record<GuessType, 1 | 2 | 0 | null>;
  answer: number;
  expression: string;
  alternateExpressions: string[];
  constructor(expression: string, answer: number) {
    this.answer = answer;
    this.expression = expression;
    this.alternateExpressions = this.calculateAlternateExpressions();
    this.gameResults = null;
    this.guesses = [];
    this.guessedValues = {
      "0": null,
      "1": null,
      "2": null,
      "3": null,
      "4": null,
      "5": null,
      "6": null,
      "7": null,
      "8": null,
      "9": null,
      "+": null,
      "-": null,
      "*": null,
      "/": null,
    };
    // this.guess("4/4+10");
  }

  validateGuess(expression: string) {
    if (expression.length < this.expression.length) {
      throw Error("Not enough numbers");
    }
    if (eval(expression) !== this.answer) {
      throw Error(
        `Every guess must equal ${this.answer} ... are you forgetting order of operations?`
      );
    }
  }

  guess(expression: string) {
    this.validateGuess(expression);
    const result: GuessResultType[] = [];
    expression.split("").forEach((char: string, index: number) => {
      if (this.expression[index] === char) {
        this.guessedValues[char as GuessType] = 1;
        result.push(1);
      } else if (this.expression.includes(char)) {
        this.guessedValues[char as GuessType] = 2;
        result.push(2);
      } else {
        this.guessedValues[char as GuessType] = 0;
        result.push(0);
      }
    });
    if (this.alternateExpressions.includes(expression)) {
      this.gameResults = 1;
      this.guesses.push([this.expression, Array(expression.length).fill(1)]);
      return true;
    } else if (this.guesses.length === 6) {
      this.gameResults = 0;
    }
    this.guesses.push([expression, result]);
    return true;
  }

  static getExpressionGrouping(exp: string) {
    function breakExpression(exp: string, operators: string[]): any {
      if (operators.length === 0) {
        return exp;
      }
      const op = operators[0];
      const nextOps = operators.slice(1, operators.length);
      const splitArray = exp.split(op).reduce((acc, el) => {
        return [
          op,
          breakExpression(acc, nextOps),
          breakExpression(el, nextOps),
        ];
      });
      if (typeof splitArray === "string") {
        return breakExpression(splitArray, nextOps);
      }
      return splitArray;
    }
    return breakExpression(exp, ["+", "-", "*", "/"]);
  }

  static getExpressionCombinations(groupings: (string | number | any)[]) {
    function evalExpression(opp: string, a: string, b: string) {
      const isReverseableOpp = opp === "+" || opp === "*";
      if (!isNaN(a) && !isNaN(b)) {
        if (isReverseableOpp) {
          return [a + opp + b, b + opp + a];
        } else {
          return [a + opp + b];
        }
      } else if (!isNaN(a)) {
        if (isReverseableOpp) {
          return [
            evalExpression(...b)
              .map((exp: any) => a + opp + exp)
              .concat(evalExpression(...b).map((exp: any) => exp + opp + a)),
          ];
        } else {
          return evalExpression(...b).map((exp: any) => a + opp + exp);
        }
      } else if (!isNaN(b)) {
        if (isReverseableOpp) {
          return evalExpression(...a)
            .map((exp: any) => exp + opp + b)
            .concat(evalExpression(...a).map((exp: any) => b + opp + exp));
        } else {
          return evalExpression(...a).map((exp: any) => exp + opp + b);
        }
      } else {
        if (isReverseableOpp) {
          return evalExpression(...a)
            .map((exp1: any) =>
              evalExpression(...b).map((exp2: any) => exp1 + opp + exp2)
            )
            .concat(
              evalExpression(...a).map((exp1: any) =>
                evalExpression(...b).map((exp2: any) => exp2 + opp + exp1)
              )
            )
            .flat();
        } else {
          return evalExpression(...a)
            .map((exp1: any) =>
              evalExpression(...b).map((exp2: any) => exp1 + opp + exp2)
            )
            .flat();
        }
      }
    }
    return evalExpression(...groupings);
  }

  calculateAlternateExpressions() {
    const groupings = Game.getExpressionGrouping(this.expression);
    const alternateExpressions = Game.getExpressionCombinations(groupings);
    return alternateExpressions;
  }
}
