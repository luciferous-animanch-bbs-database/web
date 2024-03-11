import { atom } from "recoil";

import type { Thread } from "@/usecases/fetch_threads.ts";

export const AStateThreads = atom<Thread[]>({
  key: "CachedThreads",
  default: [] as Thread[],
});
