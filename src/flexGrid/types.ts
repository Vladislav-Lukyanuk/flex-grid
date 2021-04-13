type TFlexCommon = "inherit" | "initial" | "unset";

export type TFlexAlign =
  | TFlexCommon
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

export type TFlexJustify =
  | TFlexCommon
  | "center"
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "left"
  | "right"
  | "baseline"
  | "first baseline"
  | "last baseline"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "safe center"
  | "unsafe center";
