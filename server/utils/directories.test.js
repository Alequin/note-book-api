import fs from "fs";
import { clientDirectory } from "./directories.js";

describe("rootDirectory", () => {
  it("should point at the client directory", () => {
    expect(clientDirectory).toMatch(/.*note-book-server\/build$/);
  });
});
