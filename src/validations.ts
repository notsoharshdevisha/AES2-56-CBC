import ArgumentError from "./ArgumentError";

export function validateNumberOfArguments(args: Array<string>): void {
  if (args.length !== 6) {
    throw new ArgumentError("must supply 4 arguments");
  }
}
