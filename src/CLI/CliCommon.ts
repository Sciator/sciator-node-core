import * as readline from "readline";
import chalk from "chalk";

export const CliQuestion = async (qq: string, nl = true): Promise<string> => {
  return new Promise((resolve) => {
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    read.question(`${qq}${nl ? "\n" : ""}`, (res) => {
      resolve(res);
      read.close();
    });
  });
};

export const CliQuestionYN = async (qq: string) => {
  let res: boolean | undefined = undefined;
  do {
    switch (await CliQuestion(qq + ` [${chalk.greenBright("Y")}/${chalk.redBright("N")}] `, false)) {
      case "Y": case "y":
        res = true;
        break;
      case "n": case "N":
        res = false;
        break;
    }
  } while (res === undefined);
  return res;
};


export const CliCollectionSelectOne: {
  <T>(col: T[], display: (d: T) => string): Promise<T>,
  (col: string[]): Promise<string>,
} = async <T>(col: T[], display: (d: T) => string = ((str: T) => str as any)): Promise<T> => {

  console.log();
  col.map((x, i) => `${i.toString().padStart(3, " ")}: ${display(x)}`)
    .forEach(x => console.log(x))
    ;
  const validateNumber = async (str: string) => {
    const num = Number.parseInt(str, 10);
    return (!Number.isNaN(num)
      && (num >= 0)
      && (num < col.length)
    );
  };
  let res: string;
  while (!await validateNumber(res = await CliQuestion("# to select"))) {
    console.log("invalid value selected");
  }
  return col[+res];
};


export const CliNumberFloat = async (qq: string) => {
  const validateNumber = async (str: string) => {
    const num = +str;
    return !Number.isNaN(num);
  };
  let res: string;
  while (!await validateNumber(res = (await CliQuestion(qq)).split(",").join("."))) {
    console.log("invalid value selected");
  }
  return +res;
};

export const CliNumberInt = async (qq: string) => {
  const validateNumber = async (str: string) => {
    const num = +str;
    return (num.toFixed(0) === num.toString(10)) && !Number.isNaN(num);
  };
  let res: string;
  while (!await validateNumber(res = (await CliQuestion(qq)).split(",").join("."))) {
    console.log("invalid value selected");
  }
  return +res;
};
