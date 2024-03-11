import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

import { AGlobalLoading } from "@/atoms/a_global_loading.ts";
import { CGlobalLoading } from "@/components/c_global_loading";
import { CNavbar } from "@/components/c_navbar";

import Styles from "./l_main.module.css";

export function LMain() {
  const [loading, _] = useRecoilState(AGlobalLoading);
  return (
    <div
      className={classNames(
        "has-background-dark",
        "has-text-white",
        Styles.Body,
      )}
    >
      <CGlobalLoading state={loading} />
      <CNavbar />
      <div>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
