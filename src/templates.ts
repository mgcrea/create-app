import { blue, cyan, magenta, yellow } from "kolorist";

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
    display: "Vanilla",
    color: yellow,
    variants: [
      // {
      //   name: "vanilla",
      //   display: "JavaScript",
      //   color: yellow,
      // },
      {
        name: "vanilla-ts",
        display: "TypeScript",
        color: blue,
      },
      {
        name: "vanilla-lib-ts",
        display: "TypeScript Library",
        color: magenta,
      },
    ],
  },
  {
    name: "fastify",
    display: "Fastify",
    color: cyan,
    variants: [
      // {
      //   name: "fastify",
      //   display: "JavaScript",
      //   color: yellow,
      // },
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
];

export const TEMPLATE_NAMES = TEMPLATES.map(({ name, variants }) =>
  variants ? variants.map(({ name }) => name) : [name]
).reduce((soFar, value) => soFar.concat(value), []);
