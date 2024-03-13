export type SpanInfo = {
  text: string | number;
  className: string;
  handleClick?: () => void;
};

export type ListItemInfo = {
  className?: string;
  span: SpanInfo;
};
