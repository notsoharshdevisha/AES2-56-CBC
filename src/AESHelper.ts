import CommandLineArgs from "./commandLineArgs";
import { createCipheriv, Encoding, createDecipheriv } from "crypto";

export function encrypt(
  algorithm: string,
  commandLineArgs: CommandLineArgs,
  inputFormat: string,
  outputFormat: string
): string {
  const cipher = createCipheriv(
    algorithm,
    commandLineArgs.getKey(),
    commandLineArgs.getInitializationVector()
  );
  let cipherText = cipher.update(
    commandLineArgs.getMessage(),
    inputFormat as Encoding,
    outputFormat as Encoding
  );
  cipherText += cipher.final(outputFormat as BufferEncoding);
  return cipherText;
}

export function decrypt(
  algorithm: string,
  commandLineArgs: CommandLineArgs,
  inputFormat: string,
  outputFormat: string
): string {
  const cipher = createDecipheriv(
    algorithm,
    commandLineArgs.getKey(),
    commandLineArgs.getInitializationVector()
  );
  let originalMessage = cipher.update(
    commandLineArgs.getMessage(),
    inputFormat as Encoding,
    outputFormat as Encoding
  );
  originalMessage += cipher.final(outputFormat as BufferEncoding);
  return originalMessage;
}
