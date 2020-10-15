export const mapConsoleArguments = (args) =>
  args.reduce(
    (newArgs, currentArgument) => ({
      ...newArgs,
      ...mapArg(currentArgument),
    }),
    {},
  );

const mapArg = (argument) => {
  const mappedArg = keyValueArg(argument) || booleanArg(argument);

  if (!mappedArg)
    throw new Error(
      `A given argument has a bad format: ${argument}. Should be in the format --key=value or --key for boolean args`,
    );

  return mappedArg;
};

const keyValueArg = (argument) => {
  const match = argument.match(/^--(\w*)=(\w*)$/);
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
