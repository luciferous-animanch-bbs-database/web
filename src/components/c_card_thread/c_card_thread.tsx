import classNames from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";

import type { Thread } from "@/usecases/fetch_threads.ts";

import Styles from "./c_card_thread.module.css";

export type PropsCCardThread = {
  thread: Thread;
};

export function CCardThread({ thread }: PropsCCardThread) {
  const thumbnail = `/thumbnails/${thread.saved_thumbnail_file}`;
  return (
    <div
      className={classNames(
        "card",
        "has-background-black",
        "has-text-white",
        Styles.Card,
      )}
    >
      <div className={classNames("card-content", Styles.CardContent)}>
        <div className="media">
          <div className="media-left mr-2">
            <a href={thread.url} target="_blank" rel="noopener noreferrer">
              <figure
                className={classNames("image", "is-square", Styles.Thumbnail)}
              >
                <LazyLoadImage src={thumbnail} alt={thread.title} />
              </figure>
            </a>
          </div>
          <div
            className={classNames(
              "media-content",
              "has-text-left",
              "is-flex",
              "is-flex-direction-column",
              "is-justify-content-space-between",
              "is-flex-wrap-wrap",
              Styles.MediaContent,
            )}
          >
            <p className={classNames("has-text-info", Styles.Category)}>
              {thread.category}
            </p>
            <p className={classNames("has-text-white", Styles.Title)}>
              <a
                href={thread.url}
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-white"
              >
                {thread.title}
              </a>
            </p>
            <p className={classNames("has-text-grey", Styles.Datetime)}>
              {thread.datetime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
