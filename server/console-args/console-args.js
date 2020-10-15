import { mapConsoleArguments } from "./map-console-args";
const givenArgs = process.argv.slice(2);
export default Object.freeze(mapConsoleArguments(givenArgs));
