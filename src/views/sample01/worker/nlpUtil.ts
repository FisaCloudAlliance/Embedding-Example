import nlp from "compromise";
import { TiktokenModel, encodingForModel } from "js-tiktoken";
export function parseNlp(text: string) {
  try {
    // テキストを解析
    const doc = nlp(text);
    const sentences = doc.sentences().out("array");
    return sentences as string[];
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function parse(text: string, model: TiktokenModel) {
  // 長い文章を意味のある文節へNLPを利用して区切る
  const arr = parseNlp(text);
  // 指定モデルにおけるトークン数を算出する
  const parser = encodingForModel(model);
  const array = new Array<{
    id: number;
    text: string;
    tokens: number;
    characters: number;
  }>();
  for (let i = 0; i < arr.length; i++) {
    const each = arr[i];
    const enc = parser.encode(each);
    const tokens = enc.length;
    const characters = each.length;
    array.push({
      id: i,
      text: each,
      tokens,
      characters,
    });
  }
  return array;
}
