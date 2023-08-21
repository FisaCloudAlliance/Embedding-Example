import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
import { useToast } from "../../core/snackbarExtension";
import { useDispatch } from "react-redux";
import { waitSite } from "../../store/overlay";
import { useProgress } from "../../hooks/useProgress";
import { useLayoutEffect, useState } from "react";
import { listColumns } from "./columns";
import { paragraph } from "./paragraph";
import { useSession } from "../../hooks/useSession";
import { MessageModel } from "@chatscope/chat-ui-kit-react";

const factory = createWorkerFactory(() => import("./worker"));
const pdfFactory = createWorkerFactory(() => import("./worker/pdfWorker"));
const apiFactory = createWorkerFactory(() => import("./worker/embedding"));
export function useSample01() {
  const worker = useWorker(factory);
  const pdfWorker = useWorker(pdfFactory);
  const apiWorker = useWorker(apiFactory);

  const [session] = useSession();
  const toast = useToast();
  const dispatch = useDispatch();
  const progress = useProgress();

  const [columns, setColumns] = useState(listColumns());
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState<paragraph[]>([]);

  const [chatMessages, setChatMessages] = useState<MessageModel[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loadingWithAI, setLoadingWithAI] = useState(false);

  return {
    onFileChangeAsync,
    tokens,
    columns,
    sendEmbeddingAPIAsync,

    chatInput,
    onChangeInput,
    questionAsync,
    chatMessages,
    loadingWithAI,

    vectorStorageExportAsync,
    vectorStorageImportAsync,
  };

  async function onFileChangeAsync(files: File[]) {
    setTokens([]);

    const file = files?.firstOrDefault();
    if (!file) return;

    dispatch(waitSite(true));
    progress.start();
    try {
      const fileType = await worker.parseTypeTextOrPDF(file);
      if (fileType === "TEXT") {
        await parseTextAsync(file);
      } else {
        await parsePDFAsync(file);
      }

      toast.Success(`テキストファイルをNLP(自然言語解析)解析し、トークン分割まで完了しました。
      この後、Embedding API を利用し、文章をベクトル化してください。`);
    } catch (err) {
      toast.AppError(err);
    } finally {
      dispatch(waitSite(false));
      progress.complete();
    }
  }

  /** テキストファイルをトークン化 */
  async function parseTextAsync(file: File) {
    // background worker へ ファイル読み込み処理を委譲
    const result = await worker.fileReadAsync(file);
    if (!result) return;
    setText(result);

    // Embedding API にリクエストを送る前に、どの程度のToken数になるか、概算を出す
    const tokens = await worker.parseTokens(result);
    updateTokens(file, tokens);
  }

  async function parsePDFAsync(file: File) {
    // background worker へ ファイル読み込み処理を委譲
    const result = await pdfWorker.readTextAsync(file);
    if (!result) return;
    setText(result);

    // Embedding API にリクエストを送る前に、どの程度のToken数になるか、概算を出す
    const tokens = await pdfWorker.parseTokensWithSplitSentence(result);
    updateTokens(file, tokens);
  }

  function updateTokens(
    file: File,
    tokens: {
      id: number;
      text: string;
      tokens: number;
      characters: number;
    }[]
  ) {
    // 分解されたトークンに、付属情報を付与する
    const newArray = new Array<paragraph>();
    const tags = [file.name];
    for (const each of tokens) {
      newArray.push({
        ...each,
        tags,
      });
    }
    setTokens(newArray);
  }

  async function sendEmbeddingAPIAsync() {
    if (tokens.length === 0) {
      toast.Warning("読込対象のファイルがありません。");
      return;
    }
    const key = session.userInfo?.key;
    if (!key) {
      toast.Warning("API キー を右上アカウントボタンより設定してください。");
      return;
    }

    dispatch(waitSite(true));
    progress.start();
    try {
      const newTokens = await apiWorker.sendEmbeddedAPIAsync(key, tokens);
      setTokens([...newTokens]);
      toast.Success(`ベクトル化しました。`);
    } catch (err) {
      toast.AppError(err);
    } finally {
      dispatch(waitSite(false));
      progress.complete();
    }
  }

  function onChangeInput(html) {
    setChatInput(html);
  }

  async function questionAsync() {
    const message = chatInput;
    setChatInput("");

    const newMessage: MessageModel = {
      message: message,
      direction: "outgoing",
      position: "single",
    };
    chatMessages.push(newMessage);

    if (tokens.length === 0) {
      const errorMessage: MessageModel = {
        message:
          "検索対象のファイルがありません。左側グリッドへ対象を読み込ませてください。",
        direction: "incoming",
        position: "single",
      };
      chatMessages.push(errorMessage);
      setChatMessages([...chatMessages]);
      setChatInput("");
      return;
    }
    if (tokens.any((x) => !x.vector)) {
      const errorMessage: MessageModel = {
        message:
          "表示したグリッドに対してベクトル化が行われていません。ベクトル化ボタンを押下してください。",
        direction: "incoming",
        position: "single",
      };
      chatMessages.push(errorMessage);
      setChatMessages([...chatMessages]);
      setChatInput("");
      return;
    }
    const key = session.userInfo?.key;
    if (!key) {
      const errorMessage: MessageModel = {
        message: "API キー を右上アカウントボタンより設定してください。",
        direction: "incoming",
        position: "single",
      };
      chatMessages.push(errorMessage);
      setChatMessages([...chatMessages]);
      return;
    }

    setLoadingWithAI(true);
    progress.start();
    try {
      const [results] = await apiWorker.searchAsync(key, message, tokens);
      if (results.length === 0) {
        chatMessages.push({
          message: "現在の学習内容からは回答が見つけられませんでした。",
          direction: "incoming",
          position: "single",
        });
      } else {
        for (const each of results) {
          const score = each.score.toPercent();
          chatMessages.push({
            message: each.text,
            direction: "incoming",
            position: "single",
            payload: `類似度：${score} tag：${each.tags?.join("") ?? ""} `,
          });
        }
      }
      setChatMessages([...chatMessages]);
    } catch (err) {
      toast.AppError(err);
    } finally {
      setLoadingWithAI(false);
      progress.complete();
    }
  }

  /** ベクトル・ストレージのエクスポート */
  async function vectorStorageExportAsync() {
    if (tokens.any((x) => !x.vector)) {
      toast.Warning("ベクトル化が行われていません。");
      return;
    }
    const filename = tokens[0].tags
      ? `${tokens[0].tags[0]}.json`
      : "vector.json";

    const json = JSON.stringify(tokens);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = filename || "download";
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(href);
        link.removeEventListener("click", clickHandler);
        link.remove();
      }, 150);
    };
    link.addEventListener("click", clickHandler, false);
    link.click();
  }

  /** ベクトル・ストレージのインポート */
  async function vectorStorageImportAsync() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    const onChangeHandler = (event) => {
      if (!event.target?.files) return;
      const file = event.target?.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const tokens = JSON.parse(e.target!.result as string);
        setTokens(tokens);
        toast.Info("読込ました。");
      };
      reader.readAsText(file);
      setTimeout(() => {
        input.removeEventListener("change", onChangeHandler);
        input.remove();
      }, 150);
    };
    input.addEventListener("change", onChangeHandler);
    input.click();
  }
}
