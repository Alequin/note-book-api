export const mapConsoleArguments = (args) =>
  args.reduce(
    (newArgs, argument) => ({
      ...newArgs,
      ...(keyValueArg(argument) || booleanArg(argument)),
    }),
    {},
  );

const keyValueArg = (argument) => {
  const match = argument.match(/^--(\w*)=(.*)$/);
  if (!match) return null;

  const [_, key, value] = match;
  return key && value && { [key]: value };
};

const booleanArg = (argument) => {
  const match = argument.match(/^--(\w*)$/);
  if (!match) return null;

  const [_, key] = match;
  return key && { [key]: true };
};
