import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

export const rootDirectory = resolve(dirname(__filename), `../..`);
