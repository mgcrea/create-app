import minimist from "minimist";
// @TODO https://github.com/privatenumber/cleye/blob/develop/examples/pkg-size/index.ts

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
export const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ["_"] });

export type Argv = typeof argv;
