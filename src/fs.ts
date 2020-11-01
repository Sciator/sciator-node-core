import { lstatSync, copyFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

export const copyRecrusivePreservingDirectories = (from: string, to: string, fileReg: RegExp = /.*/) => {
  if (lstatSync(from).isFile()) {
    if (fileReg.test(from))
      copyFileSync(from, to);

    return;
  }

  if (!existsSync(to))
    mkdirSync(to);

  readdirSync(from)
    .forEach(x => copyRecrusivePreservingDirectories(join(from, x), join(to, x), fileReg));
};
