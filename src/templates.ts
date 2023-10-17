import { blue, cyan, green, lightRed, magenta, yellow } from "kolorist";

export type ColorFunction = (str: string | number) => string;

export type Template = {
  name: string;
  display: string;
  color: ColorFunction;
  variants: TemplateVariant[];
};

export type TemplateVariant = {
  name: string;
  display: string;
  color: ColorFunction;
  customCommand?: string;
};

export const TEMPLATES: Template[] = [
  {
    name: "vanilla",
    display: "Vanilla Backend",
    color: yellow,
    variants: [
      {
        name: "nodejs-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        name: "nodejs-lib-ts",
        display: "TypeScript Library",
        color: magenta,
      },
    ],
  },
  {
    name: "fastify",
    display: "Fastify Backend",
    color: cyan,
    variants: [
      {
        name: "fastify-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        name: "fastify-plugin-ts",
        display: "TypeScript Plugin",
        color: magenta,
      },
    ],
  },
  {
    name: "hono",
    display: "Hono Backend",
    color: lightRed,
    variants: [
      {
        name: "hono-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "react",
    display: "React Frontend",
    color: green,
    variants: [
      {
        name: "react-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "react-native",
    display: "React Native Application",
    color: green,
    variants: [
      {
        name: "react-native-ts",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
];

export const TEMPLATE_NAMES = TEMPLATES.map(({ name, variants }) =>
  variants ? variants.map(({ name }) => name) : [name],
).reduce((soFar, value) => soFar.concat(value), []);
