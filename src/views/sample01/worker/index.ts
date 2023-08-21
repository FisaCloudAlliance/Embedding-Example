
import { TiktokenModel } from "js-tiktoken";
import { parse } from "./nlpUtil";

export async function fileReadAsync(file: File) {
  const text = await fileToStringAsync(file);
  return text;
}

export function parseTypeTextOrPDF(file: File) {
  const fileName = file.name;
  const fileExtension = fileName.split(".").lastOrDefault().toLowerCase();
  if (fileExtension === "pdf") {
    return "PDF";
  }
  return "TEXT";
}

function fileToStringAsync(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsText(file);
  });
}

export function parseTokens(
  text: string,
  model: TiktokenModel = "text-embedding-ada-002"
) {
  return parse(text, model);
}

