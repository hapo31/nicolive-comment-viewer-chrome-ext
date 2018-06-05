import * as styled from "styled-components";

const defaultStyle = styled.default;

const definedStyle = (propName: string, value: string) =>
  `${propName}: ${value};`;

const heightOrNull = (props: { height?: string }) =>
  !!props.height ? definedStyle("height", props.height) : "";

type GridViewProps = {
  isOperator?: boolean;
  height?: string;
};
export const GridView = defaultStyle.div`
${(props: GridViewProps) => (!!props.isOperator ? "color: red" : "")}
  border-bottom: solid 1px gray;
${heightOrNull}
  font-size: 14px;
`;

type GridProps = {
  width?: string;
  height?: string;
};
export const Grid = defaultStyle.div`
  ${(prop: GridProps) =>
    prop.width != null ? definedStyle("width", prop.width) : ""}
  display: inline-block;
  ${(prop: GridProps) =>
    prop.height != null ? definedStyle("height", prop.height) : ""}
  padding-left: 3px;
  padding-top: 1px;
  border-left: solid 1px gray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const GridItem = defaultStyle.span`
`;
