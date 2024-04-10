import CommandLineArgs from "./commandLineArgs";
import { validateNumberOfArguments } from "./validations";
import { encrypt, decrypt } from "./AESHelper";
import Operation from "./Operation";

function main() {
  const argv = process.argv;
  validateNumberOfArguments(argv);

  const commandLineArgs: CommandLineArgs = new CommandLineArgs(
    argv[2],
    argv[3],
    argv[4],
    argv[5]
  );

  let result;
  const algorithm = "aes-256-cbc";
  let inputEncoding;
  let outputEncoding;
  if (commandLineArgs.getOperation() === Operation.ENCRYPT) {
    inputEncoding = "utf-8";
    outputEncoding = "hex";
    result = encrypt(algorithm, commandLineArgs, inputEncoding, outputEncoding);
  } else {
    inputEncoding = "hex";
    outputEncoding = "utf-8";
    result = decrypt(algorithm, commandLineArgs, inputEncoding, outputEncoding);
  }
  console.log(result);
}

main();
