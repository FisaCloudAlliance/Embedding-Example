export type paragraph = {
  id: number;
  text: string;
  tokens: number;
  characters: number;
  tags?: string[];

  /** 文章のベクトル */
  vector?: number[];
  /** ベクトルの大きさ（ユークリッドノルム）を表すマグニチュード */
  magnitude?: number;
};
