// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  expression: string;
  answer: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const DEFAULT_EXPRESSION = "56/7+3";
  function getExpression(result: number): string {
    // randomly generate expression based on result

    //validate expression
    if (eval(DEFAULT_EXPRESSION) === result) return DEFAULT_EXPRESSION;
    return DEFAULT_EXPRESSION;
  }

  res.status(200).json({ expression: getExpression(11), answer: 11 });
}
