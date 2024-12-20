# Mathler

In this project, I created the mathler game.

## Backend

the backend is one endpoint that sends the mathler expression that the user is to guess. The expressions are auto genorated and written to `src/apiHelper/generatedExpressions.json`. These expressions were created by running `npx tsx src/apiHelper/expressionFileCreatorScript.ts` in the terminal at the root of the directory. The script autoGenerates an expression for every upcoming day for the next 10,000 days. After about 27.4 years we can rerun the script for more fun with mathler.

## Frontend

I only made one difficulty of Mathler. To support more difficulties I would add routing and save to persisted storage so the user can move between difficulties.

Moreover, if I were to continue working on the project I would add logic to persist storage. To persist storage I would save the progress and results under keys of date and difficulty.

Another addition I would add is adding stats on the results so the users can compare with friends

## Game logic

One of the tasks was to consider alternate equivalent expressions as correct. I made an assumtion that to evaluate when anyone of the expressions is fully guessed and not when incomplete. I made this assumption because it can be confusing when the positioning is correct on an alternate expression but incorrect on the main expression that it was derived from.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
