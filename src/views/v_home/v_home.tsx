import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { AGlobalLoading } from "@/atoms/a_global_loading.ts";
import { AStateThreads } from "@/atoms/a_threads.ts";
import { CCardThread } from "@/components/c_card_thread";
import { CPagination } from "@/components/c_pagination";
import { Thread, fetchThreads } from "@/usecases/fetch_threads.ts";

type SetQueryStrings = {
  page?: string;
  category?: string;
  search?: string;
};

const THREADS_PER_PAGE = 20;

export function VHome() {
  const setGlobalLoading = useSetRecoilState(AGlobalLoading);
  const [page, category, search, setPage, setCategory, setSearch] =
    useQueryStrings();

  const [threads, maxPage, categories, setThreads] = useThreads(
    category,
    search,
    page,
    setPage,
  );
  const [showModalFilter, setShowModalFilter] = useState(false);

  const elmsOptionCategory = categories.map((x) => (
    <option key={x} value={x}>
      {x}
    </option>
  ));

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
    setPage(1);
    setCategory(e.target.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function callbackChangeInputFilterTitle(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function callbackChangePage(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cards = threads.map((x) => <CCardThread thread={x} key={x.url} />);

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
              Filter ({threads.length}/{threads.length})
            </p>
          </header>
          <section className="modal-card-body has-text-black">
            <div className="field">
              <label className="label">Category</label>
              <div className="select">
                <select
                  value={category}
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
                  value={search}
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
      <div className="field is-grouped pt-2 is-justify-content-space-around">
        <p className="control">
          <button
            className="button is-link"
            onClick={() => setShowModalFilter(true)}
          >
            filter ({threads.length}/{threads.length})
          </button>
        </p>
        <p className="control">
          <button className="button is-info" onClick={() => reloadData()}>
            reload
          </button>
        </p>
      </div>
      <div className="columns">
        <div className="column has-text-centered">{cards}</div>
      </div>
      <div className="columns">
        <div className="column">
          <CPagination
            pageNumberCurrent={page}
            pageNumberMax={maxPage}
            callbackUpdate={callbackChangePage}
          />
        </div>
      </div>
    </>
  );
}

function parseCategories(threads: Thread[]): string[] {
  const categories = threads.map((x) => x.category);
  return Array.from(new Set(categories));
}

function useQueryStrings(): [
  number,
  string,
  string,
  (nextPage: number) => void,
  (nextCategory: string) => void,
  (nextSearch: string) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const keys = {
    page: "page",
    category: "category",
    search: "search",
  };

  function parsePage() {
    const raw = searchParams.get(keys.page);
    return raw == null ? null : Number(raw);
  }

  const rawPage = parsePage();
  const rawCategory = searchParams.get(keys.category);
  const rawSearch = searchParams.get(keys.search);

  if (rawPage != null && Number.isNaN(rawPage)) {
    const tmp: SetQueryStrings = {};
    if (rawCategory != null) {
      tmp.category = rawCategory;
    }
    if (rawSearch != null) {
      tmp.search = rawSearch;
    }
    setSearchParams(tmp);
  }

  function setPage(nextPage: number) {
    const tmp: SetQueryStrings = {};

    if (nextPage !== 1) {
      tmp.page = nextPage.toString();
    }

    if (rawCategory != null) {
      tmp.category = rawCategory;
    }

    if (rawSearch != null) {
      tmp.search = rawSearch;
    }

    setSearchParams(tmp);
  }

  function setCategory(nextCategory: string) {
    const tmp: SetQueryStrings = {};

    if (rawPage != null) {
      tmp.page = rawPage.toString();
    }

    if (nextCategory !== "") {
      tmp.category = nextCategory;
    }

    if (rawSearch != null) {
      tmp.search = rawSearch;
    }

    setSearchParams(tmp);
  }

  function setSearch(nextSearch: string) {
    const tmp: SetQueryStrings = {};

    if (rawPage != null) {
      tmp.page = rawPage.toString();
    }

    if (rawCategory != null) {
      tmp.category = rawCategory;
    }

    if (nextSearch !== "") {
      tmp.search = nextSearch;
    }

    setSearchParams(tmp);
  }

  const page = rawPage ?? 1;
  const category = rawCategory ?? "";
  const search = rawSearch ?? "";

  return [page, category, search, setPage, setCategory, setSearch];
}

function useThreads(
  category: string,
  search: string,
  page: number,
  setPage: (nextPage: number) => void,
): [Thread[], number, string[], (threads: Thread[]) => void] {
  const [threads, setThreads] = useRecoilState(AStateThreads);

  const categories = parseCategories(threads);

  const filteredThreads = threads
    .filter((x) => category === "" || category === x.category)
    .filter((x) => search === "" || x.title.includes(search));

  let maxPage = Math.ceil(filteredThreads.length / THREADS_PER_PAGE);
  if (maxPage === 0) {
    maxPage = 1;
  }

  if (maxPage < page) {
    setPage(1);
  }

  const slicedThreads = filteredThreads.slice(
    THREADS_PER_PAGE * (page - 1),
    THREADS_PER_PAGE * page,
  );
  return [slicedThreads, maxPage, categories, setThreads];
}
