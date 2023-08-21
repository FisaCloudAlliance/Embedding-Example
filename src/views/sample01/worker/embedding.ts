import { OpenAI } from "openai";
import { paragraph } from "../paragraph";

export async function sendEmbeddedAPIAsync(key: string, tokens: paragraph[]) {
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // 通常はbrowserから直接リクエストを行ってはならない。今は動作確認用のためだけに利用
  });

  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: tokens.map((x) => x.text),
  });
  console.log("☆", embedding);

  for (let i = 0; i < embedding.data.length; i++) {
    tokens[i].vector = embedding.data[i].embedding;
    tokens[i].magnitude = calculateMagnitude(embedding.data[i].embedding);
  }
  return tokens;
}

export async function searchAsync(
  key: string,
  message: string,
  tokens: paragraph[],
  resultCount: number = 5
) {
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // 通常はbrowserから直接リクエストを行ってはならない。今は動作確認用のためだけに利用
  });

  // 質問の内容をベクトル化
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: message,
  });
  const data = embedding.data[0];
  const queryVector = data.embedding;

  const queryMagnitude = Math.sqrt(
    queryVector.reduce((sum, val) => sum + val * val, 0)
  );
  // コサイン類似度からスコアを計算
  const scoresPairs = calculateSimilarityScores(
    tokens,
    queryVector,
    queryMagnitude
  );

  const sortedPairs = scoresPairs.sort((a, b) => b[1] - a[1]);
  const results = sortedPairs
    .slice(0, resultCount)
    .map((pair) => ({ ...pair[0], score: pair[1] }));
  return [results, embedding] as const;
}

/**
 * ベクトルの大きさ（ユークリッドノルム）を計算する
 * 方向を考慮しない、ベクトルの長さを示す
 * @param vector ベクトル
 * @returns 大きさ
 */
function calculateMagnitude(vector: number[]) {
  return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

/**
 * 文章リストのベクトルと、クエリをベクトル化したものとのコサイン類似度スコアを計算する
 * https://platform.openai.com/docs/guides/embeddings/which-distance-function-should-i-use
 *
 * @param {paragraph[]} tokens - 類似度を計算する対象の段落の配列。
 * @param {number[]} queryVector - 類似度を計算するクエリのベクトル。
 * @param {number} queryMagnitude - クエリベクトルの大きさ。
 * @returns {Array<[paragraph, number]>} 各段落とその類似度スコアの配列。
 */
function calculateSimilarityScores(
  tokens: paragraph[],
  queryVector: number[],
  queryMagnitude: number
): Array<[paragraph, number]> {
  return tokens.map((x) => {
    const dotProduct = x.vector!.reduce(
      (sum, val, i) => sum + val * queryVector[i],
      0
    );
    let score = getCosineSimilarityScore(
      dotProduct,
      x.magnitude!,
      queryMagnitude
    );
    score = normalizeScore(score); // Normalize the score
    return [x, score];
  });
}

/**
 * コサイン類似度スコアを計算します。
 *
 * @param {number} dotProduct - ベクトルの内積。
 * @param {number} magnitudeA - 最初のベクトルの大きさ。
 * @param {number} magnitudeB - 2番目のベクトルの大きさ。
 * @returns {number} コサイン類似度スコア。
 */
function getCosineSimilarityScore(
  dotProduct: number,
  magnitudeA: number,
  magnitudeB: number
): number {
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * スコアを0から1の範囲に正規化します。
 *
 * @param {number} score - 正規化する前のスコア。
 * @returns {number} 正規化されたスコア。
 */
function normalizeScore(score: number): number {
  return (score + 1) / 2;
}
