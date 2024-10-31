// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../apiHelper/generatedExpressions.json";

type Data = {
  expression: string;
  answer: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const todaysDate = Math.floor(+new Date() / 1000 / 60 / 60 / 24).toString();
  const expression = (data as Record<string, string>)[todaysDate];

  res.status(200).json({ expression, answer: eval(expression) });
}
