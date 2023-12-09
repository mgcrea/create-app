#!/usr/bin/env ts-node

import { deployTemplate, promptConfig } from "./actions";
import { isErrorWithMessage } from "./utils";
import { argv } from "./utils/argv";

console.dir({ argv });

const main = async () => {
  const config = await promptConfig(argv);
  await deployTemplate(config);
};

try {
  main();
} catch (error: unknown) {
  if (isErrorWithMessage(error)) {
    console.error(error.message);
  }
  console.error(error);
}
