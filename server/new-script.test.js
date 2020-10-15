jest.mock("./console-args/console-args.js", () => ({
  arg1: "foo",
  arg2: "bar",
}));

import { newScript } from "./new-script";

describe("new-script", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(process, "exit").mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("Runs the given callback", async () => {
    const scriptToRun = jest.fn();
    await newScript({ name: "mock", script: scriptToRun });
    expect(scriptToRun).toHaveBeenCalledTimes(1);
  });

  it("Logs when the script starts and ends", async () => {
    const scriptToRun = jest.fn();
    await newScript({ name: "mock", script: scriptToRun });
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log.mock.calls).toEqual([
      ["Starting: mock"],
      ["Finished: mock"],
    ]);
  });

  it("Calls the script function with given console args if there are any", async () => {
    const scriptToRun = jest.fn();
    await newScript({
      name: "mock",
      script: scriptToRun,
      expectedArgs: ["arg1", "arg2"],
    });
    expect(scriptToRun).toHaveBeenCalledTimes(1);
    expect(scriptToRun).toHaveBeenCalledWith({ arg1: "foo", arg2: "bar" });
  });

  it("Errors if any of the expected console args are missing", async () => {
    const scriptToRun = jest.fn();
    await expect(
      newScript({
        name: "mock",
        script: scriptToRun,
        expectedArgs: ["arg1", "arg2", "this arg does not exist"],
      }),
    ).rejects.toThrow();
  });

  it("Ends the process once the script ends", async () => {
    const scriptToRun = jest.fn();
    await newScript({ name: "mock", script: scriptToRun });
    expect(process.exit).toHaveBeenCalledTimes(1);
    expect(process.exit).toHaveBeenCalledWith();
  });

  it("Ends the process with exit code 1 if the script errors", async () => {
    const scriptToRun = jest.fn().mockImplementation(() => {
      throw new Error("failed!");
    });
    await newScript({ name: "mock", script: scriptToRun });
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(process.exit).toHaveBeenCalledTimes(1);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
