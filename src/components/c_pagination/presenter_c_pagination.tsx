import type { ListItemInfo } from "./model_c_pagination.ts";

type PropsPresenterCPagination = {
  items: ListItemInfo[];
};

export function PresenterCPagination({ items }: PropsPresenterCPagination) {
  const elmsLi = items.map((x, i) => (
    <li key={i} className={x.className}>
      <span className={x.span.className} onClick={x.span.handleClick}>
        {x.span.text}
      </span>
    </li>
  ));
  return (
    <nav className="pagination is-centered">
      <ul className="pagination-list">{elmsLi}</ul>
    </nav>
  );
}
