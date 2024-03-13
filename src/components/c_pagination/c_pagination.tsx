import classNames from "classnames";

import Styles from "./c_pagination.module.css";
import type { ListItemInfo } from "./model_c_pagination.ts";
import { PresenterCPagination } from "./presenter_c_pagination.tsx";

export type PropsCPagination = {
  pageNumberCurrent: number;
  pageNumberMax: number;
  callbackUpdate: (nextPage: number) => void;
};

export function CPagination({
  pageNumberCurrent,
  pageNumberMax,
  callbackUpdate,
}: PropsCPagination) {
  const pageNumberFirst = 1;
  const pageNumberPrevCurrent = pageNumberCurrent - 1;
  const pageNumberNextCurrent = pageNumberCurrent + 1;

  const items: ListItemInfo[] = [
    {
      className: classNames({
        [Styles.DisplayNone]: pageNumberCurrent - pageNumberFirst < 2,
      }),
      span: {
        text: pageNumberFirst,
        className: classNames(
          "pagination-link",
          "has-text-white",
          Styles.CursorPointer,
        ),
        handleClick() {
          callbackUpdate(pageNumberFirst);
        },
      },
    },
    {
      className: classNames({
        [Styles.DisplayNone]: pageNumberCurrent - pageNumberFirst < 2,
      }),
      span: {
        text: "･･･",
        className: classNames("pagination-ellipsis", Styles.EllipsisFontSize),
      },
    },
    {
      className: classNames({
        [Styles.DisplayNone]: pageNumberCurrent - pageNumberFirst < 1,
      }),
      span: {
        text: pageNumberPrevCurrent,
        className: classNames(
          "pagination-link",
          "has-text-white",
          Styles.CursorPointer,
        ),
        handleClick() {
          callbackUpdate(pageNumberPrevCurrent);
        },
      },
    },
    {
      span: {
        text: pageNumberCurrent,
        className: classNames(
          "pagination-link",
          "has-text-white",
          "is-current",
        ),
      },
    },
    {
      className: classNames({
        [Styles.DisplayNone]: pageNumberMax - pageNumberCurrent < 1,
      }),
      span: {
        text: pageNumberNextCurrent,
        className: classNames(
          "pagination-link",
          "has-text-white",
          Styles.CursorPointer,
        ),
        handleClick() {
          callbackUpdate(pageNumberNextCurrent);
        },
      },
    },
    {
      className: classNames({
        [Styles.DisplayNone]: pageNumberMax - pageNumberCurrent < 2,
      }),
      span: {
        text: "･･･",
        className: classNames("pagination-ellipsis", Styles.EllipsisFontSize),
      },
    },
    {
      className: classNames({
        [Styles.DisplayNone]: pageNumberMax - pageNumberCurrent < 2,
      }),
      span: {
        text: pageNumberMax,
        className: classNames(
          "pagination-link",
          "has-text-white",
          Styles.CursorPointer,
        ),
        handleClick() {
          callbackUpdate(pageNumberMax);
        },
      },
    },
  ];

  return <PresenterCPagination items={items} />;
}
