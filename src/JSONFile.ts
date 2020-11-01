import * as fs from "fs";
import { JSONparseNoError } from "./common";
import { TIMESTAMP_PROGRAM_RUN } from "./DateHelper";

// todo: use async
// todo: delayed write

/**
 * Class for working with collection (pseudo,not-valid)json Files
 * @example
 * const file = new JsonFile<{sample:number}>("sample");
 * file.write({sample:10});
 */
export class JsonFile<T> {
  /** dir of all data */
  public static readonly dirRelativePath = `./Data/`;
  /** dir for current program run */
  public static get dirCurrent() {
    return this.dirRelativePath + `${TIMESTAMP_PROGRAM_RUN}/`;
  }
  /** dir of last run of program */
  public static get dirPrev() {
    const dirAll = JsonFile.dirAll.filter(x => x !== TIMESTAMP_PROGRAM_RUN);
    dirAll.sort();
    return dirAll[dirAll.length - 1];
  }


  /** returns dir names of all program runs */
  public static get dirAll() {
    return fs.readdirSync(JsonFile.dirRelativePath);
  }



  private readonly fileName: string;
  /** containing dir name */
  private readonly dirName: string;
  /** relative path to current dir */
  private readonly dirRelativePath: string;
  /** realtive path to current file with data */
  private readonly filePath: string;


  /** writes given data */
  public write(data: T) {
    fs.writeFileSync(this.filePath
      , "," + JSON.stringify(data, undefined, 2)
      , { flag: "a+" }
    );
  }

  /** reads full connection, can return undefined if file is not exists */
  public readAllData(): T[] | undefined {
    let str: string;
    try {
      str = fs.readFileSync(this.filePath)
        .toString()
        ;
    } catch{
      return undefined;
    }

    return JSONparseNoError(
      "[" + str.slice(1) + "]"
    );
  }


  /** create folder and file for writing for current program instance */
  constructor(fileName: string);
  /** create reader / writer for given dir name */
  constructor(fileName: string, dirName: string);
  constructor(fileName: string, dirName?: string) {
    this.dirName = dirName || TIMESTAMP_PROGRAM_RUN;
    this.fileName = fileName;
    this.dirRelativePath = JsonFile.dirRelativePath
      + this.dirName + "/"
      ;
    this.filePath = this.dirRelativePath
      + this.fileName + ".json"
      ;

    if (!dirName) {
      fs.mkdirSync(JsonFile.dirCurrent, { recursive: true });
      fs.writeFileSync(this.filePath, "", { flag: "a+" });
    }
  }
}
