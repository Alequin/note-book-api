import { mapConsoleArguments } from "./map-console-args";

describe("mapConsoleArguments", () => {
  it("Can map given args to an object", () => {
    expect(
      mapConsoleArguments(["--serviceName=foo_bar", "--exec=true"]),
    ).toEqual({
      serviceName: "foo_bar",
      exec: "true",
    });
  });

  it('Sets args to have a values of "true" when no value is given', () => {
    expect(mapConsoleArguments(["--exec"])).toEqual({
      exec: true,
    });
  });

  it("ignores arguments which do not fit the expected format", () => {
    expect(mapConsoleArguments(["/path/to/file"])).toEqual({});
  });
});
