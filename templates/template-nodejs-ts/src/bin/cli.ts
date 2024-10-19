#!/usr/bin/env node

import { getRandomInt } from "src/utils";

const [action = "help", ...args] = process.argv.slice(2);

// eslint-disable-next-line @typescript-eslint/require-await
const main = async () => {
  switch (action) {
    case "random": {
      const [min = 1, max = 10] = args.map(Number);
      const int = getRandomInt(min, max);
      console.log(`Here is your random int between ${min} and ${max}:`, int);
      break;
    }
    default:
      console.log("Sorry, that is not something I know how to do.");
      console.log(`Try random`);
  }
};

void main();
