import { strict as assert } from "assert";
import ArgumentError from "../src/ArgumentError";
import CommandLineArgs from "../src/commandLineArgs";
import { validateNumberOfArguments } from "../src/validations";
import Operation from "../src/Operation";

describe("testing CommandLineArgs class", () => {
  describe("initializes the class while validating constructor parameters", function () {
    it("validates first argument", () => {
      try {
        new CommandLineArgs(
          "f",
          "message",
          "thisisa_32_byte_long_key_I_think",
          "initialization_vector"
        );
      } catch (e: any) {
        assert.strictEqual(
          (e as ArgumentError).message,
          "the first argument must be either -e or -d"
        );
      }
    });

    it("validates second argument", () => {
      try {
        new CommandLineArgs(
          "-e",
          "",
          "thisisa_32_byte_long_key_I_think",
          "initialization_vector"
        );
      } catch (e: any) {
        assert.strictEqual(
          (e as ArgumentError).message,
          "the message cannot be empty"
        );
      }
    });

    it("validates third argument", () => {
      try {
        new CommandLineArgs("-e", "message", "", "initialization_vector");
      } catch (e: any) {
        assert.strictEqual(
          (e as ArgumentError).message,
          "must be a 32 byte key"
        );
      }
    });

    it("validates fourth argument", () => {
      try {
        new CommandLineArgs(
          "-e",
          "message",
          "thisisa_32_byte_long_key_I_think",
          ""
        );
      } catch (e: any) {
        assert.strictEqual(
          (e as ArgumentError).message,
          "must supply initialization vector"
        );
      }
    });

    it("successful initialization of class", () => {
      const commandLineArgs: CommandLineArgs = new CommandLineArgs(
        "-e",
        "message",
        "thisisa_32_byte_long_key_I_think",
        "initialization_vector"
      );
      assert.strictEqual(commandLineArgs.getOperation(), Operation.ENCRYPT);
      assert.strictEqual(commandLineArgs.getMessage(), "message");
      assert.strictEqual(
        commandLineArgs.getKey(),
        "thisisa_32_byte_long_key_I_think"
      );
      assert.strictEqual(
        commandLineArgs.getInitializationVector(),
        "initialization_vector"
      );
    });
  });
});

describe("testing utils", () => {
  it("validates the number of command line arguments", () => {
    try {
      validateNumberOfArguments([]);
    } catch (e: any) {
      assert.strictEqual(
        (e as ArgumentError).message,
        "must supply 4 arguments"
      );
    }
  });
});
