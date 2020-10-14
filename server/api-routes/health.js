import { CURRENT_ENVIRONMENT } from "../config/environments.js";

export const health = (_req, res) => {
  res.send(
    JSON.stringify({
      running: true,
      environment: CURRENT_ENVIRONMENT,
      time: new Date().toISOString(),
    }),
  );
};
