import ArgumentError from "./ArgumentError";
import Operation from "./Operation";

export default class CommandLineArgs {
  #operation: Operation;
  #message: string;
  #key: string;
  #initializationVector: string;

  constructor(
    firstArg: string,
    secondArg: string,
    thirdArg: string,
    fourthArg: string
  ) {
    this.#validateFirstArg(firstArg);
    this.#operation = this.#resolveFirstArg(firstArg);
    this.#validateSecondArg(secondArg);
    this.#message = secondArg;
    this.#validateThirdArg(thirdArg);
    this.#key = thirdArg;
    this.#validateFourthArg(fourthArg);
    this.#initializationVector = fourthArg;
  }

  #validateFirstArg(firstArg: string): void {
    if (firstArg !== "-e" && firstArg !== "-d") {
      throw new ArgumentError("the first argument must be either -e or -d");
    }
  }

  #resolveFirstArg(firstArg: string): Operation {
    if (firstArg === "-e") {
      return Operation.ENCRYPT;
    }
    return Operation.DECRYPT;
  }

  #validateSecondArg(secondArg: string): void {
    if (!secondArg || !secondArg.length) {
      throw new ArgumentError("the message cannot be empty");
    }
  }

  #validateThirdArg(thirdArg: string): void {
    if (!thirdArg || thirdArg.length !== 32) {
      throw new ArgumentError("must be a 32 byte key");
    }
  }

  #validateFourthArg(fourthArg: string): void {
    if (!fourthArg || !fourthArg.length) {
      throw new ArgumentError("must supply initialization vector");
    }
  }

  public getOperation(): Operation {
    return this.#operation;
  }

  public getMessage(): string {
    return this.#message;
  }

  public getKey(): string {
    return this.#key;
  }

  public getInitializationVector(): string {
    return this.#initializationVector;
  }
}
