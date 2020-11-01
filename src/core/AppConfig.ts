import { readFile } from "fs";
import { promisify } from "util";
import { throwReturn, sleep } from "./Common";

export class AppConfig<TAppConfig> {
  private _config: Readonly<TAppConfig> | undefined;
  /** returns conncetion */
  public get config() {
    return this._config
      || throwReturn("Config not loaded, call init first");
  }

  public async init(fakeConfig?: TAppConfig) {
    if (fakeConfig) {
      this._config = fakeConfig;
      return;
    }
    try {
      const confStr = (await promisify(readFile)("./config.json"))
        .toString();
      const conf = JSON.parse(confStr);
      this._config = conf as any;

    } catch (e) {
      console.error("Failed to load config. application will close");
      await sleep(10_000);
      throw new Error("Failed to load config.");
    }
  }
}

