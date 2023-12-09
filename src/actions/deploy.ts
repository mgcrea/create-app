import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copy, emptyDir, pkgFromUserAgent } from "../utils";
import type { Config } from "./prompt";

const cwd = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const IS_PROD = process.env["NODE_ENV"] === "production";

const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};

export const deployTemplate = (config: Config) => {
  const { targetDir, template, overwrite, packageName, variant } = config;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  const pkgInfo = pkgFromUserAgent(process.env["npm_config_user_agent"]);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  // const isYarn1 = pkgManager === "yarn" && pkgInfo?.version?.startsWith("1.");

  console.log(`\nScaffolding project in ${root}...`);

  const templateName = variant || template.name;
  const templateDir = path.resolve(
    __filename,
    IS_PROD ? "../../" : "../../../",
    "templates",
    `template-${templateName}`,
  );

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  const filesToCopy = files.filter((f) => !["package.json", "pnpm-lock.yaml"].includes(f));
  for (const file of filesToCopy) {
    write(file);
  }

  const pkgJsonFilePath = path.join(templateDir, `package.json`);
  if (fs.existsSync(pkgJsonFilePath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgJsonFilePath, "utf-8"));
    pkg.name = packageName;
    // @TODO "access": "public" if scoped
    write("package.json", JSON.stringify(pkg, null, 2));
  }

  // spawn.sync("sh", ["-c", `${root !== cwd ? `cd ${path.relative(cwd, root)}; ` : ""}git init`], {
  //   stdio: "inherit",
  // });

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }

  switch (pkgManager) {
    case "yarn":
      console.log(`  ${pkgManager}`);
      console.log(`  ${pkgManager} dev`);
      break;
    case "pnpm":
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} dev`);
      break;
    case "bun":
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} dev`);
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
};
