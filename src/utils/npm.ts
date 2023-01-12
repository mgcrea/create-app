export const isValidPackageName = (projectName: string) =>
  /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);

export const toValidPackageName = (projectName: string) =>
  projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");

export const pkgFromUserAgent = (userAgent: string | undefined) => {
  const pkgSpec = userAgent?.split(" ")[0];
  if (!pkgSpec) {
    return undefined;
  }
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
};

export const formatTargetDir = (targetDir: string | undefined) => {
  return targetDir?.trim().replace(/\/+$/g, "");
};
