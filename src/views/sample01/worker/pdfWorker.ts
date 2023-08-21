import { TiktokenModel } from "js-tiktoken";
import { parse } from "./nlpUtil";
import pdfjsLib, {
  PDFDocumentProxy,
  PDFPageProxy,
  getDocument,
} from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
const pdfjs = await import("pdfjs-dist/build/pdf");
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function readTextAsync(file: File) {
  const data = await readByteArrayAsync(file);
  const pdfDocument = await getDocument({ data: data }).promise;
  const text = await readPDFAsync(pdfDocument);
  return text;
}

async function readByteArrayAsync(file: File) {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) {
        reject("Error reading file");
        return;
      }
      const pdfData = new Uint8Array(result as ArrayBuffer);
      resolve(pdfData);
    };
    reader.readAsArrayBuffer(file);
  });
}

async function readPDFAsync(pdfDocument: PDFDocumentProxy) {
  // 本文
  const arr = new Array<string>();
  const size = getSize(await pdfDocument.getPage(1));

  const startPage = await parseStartPageAsync(pdfDocument);
  for (let i = startPage; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);

    const text = await page.getTextContent();
    for (let j = 0; j < text.items.length; j++) {
      const item = text.items[j] as TextItem;
      // ヘッダーやフッターにあるページ番号や表題が文中に紛れないように除外
      if (isHeaderOrFotter(size.height, item)) {
        continue;
      }
      // 高さが 12 以下の場合は、ページ脚注など本文以外の文章と認識し、読み飛ばす
      if (item.height < 12) {
        continue;
      }

      const s = item.str;
      if (String.isNullOrEmpty(s)) {
        continue;
      }
      arr.push(s);
    }
  }
  return arr.join("");
}

function isHeaderOrFotter(pageHeight: number, item: TextItem) {
  // transform配列からY座標を取得
  const y = item.transform[5];
  // 上部または下部にあるか判断
  if (y > pageHeight * 0.9) {
    return true;
  } else if (y < pageHeight * 0.1) {
    return true;
  }
  return false;
}

function getSize(page: PDFPageProxy) {
  const viewport = page.getViewport({ scale: 1 });
  return {
    height: viewport.height,
    width: viewport.width,
  };
}

async function parseStartPageAsync(pdfDocument: PDFDocumentProxy) {
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const text = await page.getTextContent();
    const s = text.items
      .map((x) => x["str"] as string)
      .where((x) => !String.isNullOrWhiteSpace(x))
      .join("");
    // 句読点がない場合は、表紙や目次と割り切って読み飛ばす（文章として成り立たない）
    if (s.indexOf("。") !== -1) {
      return i;
    }
  }
  return 1;
}
export function parseTokens(
  text: string,
  model: TiktokenModel = "text-embedding-ada-002"
) {
  return parse(text, model);
}

export function parseTokensWithSplitSentence(
  text: string,
  model: TiktokenModel = "text-embedding-ada-002"
) {
  const buffArray = splitSentence(text);
  const chunk = buffArray.chunk(2).select((x) => x.join(""));

  const sentences = new Array<any>();
  for (const each of chunk) {
    const plus = sentences.length;
    const chunks = parse(each, model);
    for (let i = 0; i < chunks.length; i++) {
      const item = chunks[i];
      // 一つの文章が 1k トークンを超えるものは解析が上手くできてないと判断し、次の文章へ
      if (1000 < item.tokens) {
        continue;
      }
      sentences.push({
        ...item,
        id: item.id + plus,
      });
    }
  }
  return sentences;
}

function splitSentence(text: string) {
  const sentences = new Array<string>();
  let sentenceStart = 0;
  let insideParentheses = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // 括弧の開始を検出
    if (char === "（" || char === "「" || char === "【") {
      insideParentheses += 1;
    }

    // 括弧の終了を検出
    if (char === "）" || char === "」" || char === "】") {
      insideParentheses -= 1;
    }

    // 括弧の外で句点を検出
    if (char === "。" && insideParentheses === 0) {
      const sentence = text.substring(sentenceStart, i + 1).trim();
      sentences.push(sentence);
      sentenceStart = i + 1;
    }
  }

  // 最後の文章が句点で終わっていない場合
  if (sentenceStart < text.length) {
    const sentence = text.substring(sentenceStart).trim();
    sentences.push(sentence);
  }

  return sentences;
}
