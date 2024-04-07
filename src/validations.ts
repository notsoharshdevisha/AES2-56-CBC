import ArgumentError from "./ArgumentError";

export function validateNumberOfArguments(args: Array<string>) {
  if (args.length < 4) {
    throw new ArgumentError("must supply 4 arguments");
  }
}
