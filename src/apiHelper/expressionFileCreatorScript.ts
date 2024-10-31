import * as fs from "fs";
import { generateExpression } from "./autoGenerate";

const todaysDate = Math.floor(+new Date() / 1000 / 60 / 60 / 24);
const obj = Array.from(Array(10000).keys()).reduce(
  (acc: Record<string, string>, index: number) => {
    let newExpression = generateExpression(6);
    while (Object.values(acc).includes(newExpression)) {
      newExpression = generateExpression(6);
    }
    return {
      ...acc,
      [todaysDate + index]: generateExpression(6),
    };
  },
  {}
);

const json = JSON.stringify({ ...obj });

fs.writeFile("src/apiHelper/generatedExpressions.json", json, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully!");
  }
});
