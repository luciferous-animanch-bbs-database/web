import classNames from "classnames";

export type PropsCLoading = {
  state: boolean;
};

export function CGlobalLoading({ state }: PropsCLoading) {
  return (
    <>
      <div className={classNames("modal", { "is-active": state })}>
        <div className="modal-background" />
        <div className="modal-content">
          <progress className="progress is-link is-large" />
        </div>
      </div>
    </>
  );
}
