import { validateNumberOfArguments } from '../src/validations';
import { strict as assert } from "assert";
import ArgumentError from "../src/ArgumentError";

describe('validations', () => {
  it('should check number of command line arguments', () => {
    try {
      validateNumberOfArguments(['1', '2', '3']);
    } catch (e: any) {
      assert.strictEqual((e as ArgumentError).message, "must supply 4 arguments");
    }
  });
});
