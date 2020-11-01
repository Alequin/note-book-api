import dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENTS_OPTIONS = {
  production: "production",
  development: "development",
  test: "test",
};

export const CURRENT_ENVIRONMENT =
  ENVIRONMENTS_OPTIONS[process.env.ENVIRONMENT] ||
  ENVIRONMENTS_OPTIONS.development;

export const isProductionEnv = () =>
  CURRENT_ENVIRONMENT === ENVIRONMENTS_OPTIONS.production;

export const isTestEnv = () =>
  CURRENT_ENVIRONMENT === ENVIRONMENTS_OPTIONS.test;
