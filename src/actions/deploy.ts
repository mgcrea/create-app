import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copy, emptyDir, pkgFromUserAgent } from "../utils";
import type { Config } from "./prompt";

const cwd = process.cwd();

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
    fileURLToPath(import.meta.url),
    "../../templates",
    `template-${templateName}`
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
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), "utf-8"));
  pkg.name = packageName;
  // @TODO "access": "public" if scoped
  write("package.json", JSON.stringify(pkg, null, 2));

  // spawn.sync("sh", ["-c", `${root !== cwd ? `cd ${path.relative(cwd, root)}; ` : ""}git init`], {
  //   stdio: "inherit",
  // });

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }

  switch (pkgManager) {
    case "yarn":
    case "pnpm":
      console.log(`  ${pkgManager} `);
      console.log(`  ${pkgManager} dev`);
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
};
