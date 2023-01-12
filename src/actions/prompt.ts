// import spawn from "cross-spawn";
import { red, reset } from "kolorist";
import fs from "node:fs";
import path from "node:path";
// import { fileURLToPath } from "node:url";
import prompts from "prompts";
import { Template, TEMPLATES, TEMPLATE_NAMES } from "../templates";
import { formatTargetDir, isEmpty, isValidPackageName, toValidPackageName } from "../utils";
import type { Argv } from "../utils/argv";

const defaultTargetDir = "node-project";

export type Config = {
  targetDir: string;
  overwrite: boolean;
  packageName: string;
  projectName: string;
  template: Template;
  variant: string;
};

type Partial<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export const promptConfig = async (argv: Argv): Promise<Config> => {
  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  let targetDir = argTargetDir || defaultTargetDir;
  const hasValidArgTemplate = argTemplate ? TEMPLATE_NAMES.includes(argTemplate) : false;

  const getProjectName = () => (targetDir === "." ? path.basename(path.resolve()) : targetDir);

  const results = await prompts(
    [
      {
        type: argTargetDir ? null : "text",
        name: "projectName",
        message: reset("Project name:"),
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir;
        },
      },
      {
        type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm"),
        name: "overwrite",
        message: () =>
          (targetDir === "." ? "Current directory" : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`,
      },
      {
        type: (_, { overwrite }: { overwrite?: boolean }) => {
          if (overwrite === false) {
            throw new Error(red("✖") + " Operation cancelled");
          }
          return null;
        },
        name: "overwriteChecker",
      },
      {
        type: () => (isValidPackageName(getProjectName()) ? null : "text"),
        name: "packageName",
        message: reset("Package name:"),
        initial: () => toValidPackageName(getProjectName()),
        validate: (dir) => isValidPackageName(dir) || "Invalid package.json name",
      },
      {
        type: hasValidArgTemplate ? null : "select",
        name: "template",
        message:
          typeof argTemplate === "string" && !TEMPLATE_NAMES.includes(argTemplate)
            ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
            : reset("Select a template:"),
        initial: 0,
        choices: TEMPLATES.map((template) => {
          const templateColor = template.color;
          return {
            title: templateColor(template.display || template.name),
            value: template,
          };
        }),
      },
      {
        type: (template: Template) => (template && template.variants ? "select" : null),
        name: "variant",
        message: reset("Select a variant:"),
        choices: (template: Template) =>
          template.variants.map((variant) => {
            const variantColor = variant.color;
            return {
              title: variantColor(variant.display || variant.name),
              value: variant.name,
            };
          }),
      },
    ],
    {
      onCancel: () => {
        throw new Error(red("✖") + " Operation cancelled");
      },
    }
  );

  const defaults: Partial<Config> = {
    overwrite: false,
    template: hasValidArgTemplate
      ? TEMPLATES.find(
          ({ name, variants }) =>
            argTemplate === name || variants.some((variant) => argTemplate === variant.name)
        )
      : undefined,
    variant: hasValidArgTemplate ? argTemplate : undefined,
    packageName: getProjectName(),
  };

  return {
    ...defaults,
    ...results,
    targetDir,
  };
};
