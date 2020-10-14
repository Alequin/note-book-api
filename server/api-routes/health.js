import { CURRENT_ENVIRONMENT } from "../config/environments.js";

export const health = (_req, res) => {
  res.send(`
    Running: true,
    Environment: ${CURRENT_ENVIRONMENT},
    Time: ${new Date().toTimeString()}`);
};
