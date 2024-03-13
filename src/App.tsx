import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { AGlobalLoading } from "@/atoms/a_global_loading.ts";
import { AStateThreads } from "@/atoms/a_threads.ts";
import { router } from "@/router";
import { fetchThreads } from "@/usecases/fetch_threads.ts";

export function App() {
  const setGlobalLoading = useSetRecoilState(AGlobalLoading);
  const setStateThreads = useSetRecoilState(AStateThreads);

  async function loadThreads() {
    try {
      const resp = await fetchThreads();
      setStateThreads(resp.threads);
      setGlobalLoading(false);
    } catch (e) {
      console.log({ msg: "error", err: e });
      alert("データの取得に失敗しました");
    }
  }

  useEffect(() => {
    loadThreads();
  }, []);

  return <RouterProvider router={router} />;
}
