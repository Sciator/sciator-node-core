
export const execAsync = (cmd: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    (await import("child_process")).exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
};
