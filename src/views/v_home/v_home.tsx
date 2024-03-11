import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { AGlobalLoading } from "@/atoms/a_global_loading.ts";
import { AStateThreads } from "@/atoms/a_threads.ts";
import { CCardThread } from "@/components/c_card_thread";
import { Thread, fetchThreads } from "@/usecases/fetch_threads.ts";

export function VHome() {
  const setGlobalLoading = useSetRecoilState(AGlobalLoading);
  const [threads, setThreads] = useRecoilState(AStateThreads);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputtedTitle, setInputtedTitle] = useState("");
  const [showModalFilter, setShowModalFilter] = useState(false);

  const categories = parseCategories(threads);
  const elmsOptionCategory = categories.map((x) => (
    <option key={x} value={x}>
      {x}
    </option>
  ));

  const filteredThreads = threads
    .filter((x) => selectedCategory === "" || x.category === selectedCategory)
    .filter((x) => inputtedTitle === "" || x.title.includes(inputtedTitle));

  async function reloadData() {
    setGlobalLoading(true);
    try {
      const resp = await fetchThreads();
      setThreads(resp.threads);
    } catch (e) {
      console.log(e);
      alert("データの取得に失敗しました");
    } finally {
      setGlobalLoading(false);
    }
  }

  function callbackChangeSelectCategories(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }

  function callbackChangeInputFilterTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputtedTitle(e.target.value);
  }

  const cards = filteredThreads.map((x) => (
    <CCardThread thread={x} key={x.url} />
  ));
  return (
    <>
      <div className={classNames("modal", { "is-active": showModalFilter })}>
        <div
          className="modal-background"
          onClick={() => setShowModalFilter(false)}
        />
        <div className="modal-card">
          <header className="modal-card-head has-text-black">
            <p className="modal-card-title">
              Filter ({filteredThreads.length}/{threads.length})
            </p>
          </header>
          <section className="modal-card-body has-text-black">
            <div className="field">
              <label className="label">Category</label>
              <div className="select">
                <select
                  value={selectedCategory}
                  onChange={callbackChangeSelectCategories}
                >
                  <option value={""}>All</option>
                  {elmsOptionCategory}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Title Filter</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={inputtedTitle}
                  onChange={callbackChangeInputFilterTitle}
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot is-flex is-justify-content-end">
            <button
              className="button"
              onClick={() => setShowModalFilter(false)}
            >
              Close
            </button>
          </footer>
        </div>
      </div>
      <div className="field is-grouped pt-2">
        <p className="control">
          <button
            className="button is-link"
            onClick={() => setShowModalFilter(true)}
          >
            filter ({filteredThreads.length}/{threads.length})
          </button>
        </p>
        <p className="control">
          <button className="button is-info" onClick={() => reloadData()}>
            reload
          </button>
        </p>
      </div>
      {cards}
    </>
  );
}

function parseCategories(threads: Thread[]): string[] {
  const categories = threads.map((x) => x.category);
  return Array.from(new Set(categories));
}
