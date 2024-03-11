import { ZSTDDecoder } from "zstddec";

export type Thread = {
  category: string;
  url: string;
  title: string;
  thumbnail: string;
  unixtime: number;
  datetime: string;
};

export type ResponseThreads = {
  count: number;
  threads: Thread[];
};

export async function fetchThreads(): Promise<ResponseThreads> {
  const resp = await fetch("/data/threads.json.zst");
  const decoder = new ZSTDDecoder();
  await decoder.init();
  const array_resp = await resp.arrayBuffer();
  const array = decoder.decode(new Uint8Array(array_resp));
  const text = new TextDecoder().decode(array);
  return JSON.parse(text);
}
