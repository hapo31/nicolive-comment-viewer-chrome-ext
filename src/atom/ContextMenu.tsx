import React from "react";
import * as styled from "styled-components";

type Props = {
  items: string[];
  onClick?: (index: number) => void;
} & ContextMenuRootProps;

type ContextMenuRootProps = {
  left?: number;
  top?: number;
};
const ContextMenuRoot =
  styled.default.ul <
  ContextMenuRootProps >
  `
  width: auto;
  height: auto;
  margin: 3px;
  border: 1px solid;
  position: fixed;
  left: ${({ left }) => left || 0}px;
  top:${({ top }) => top || 0}px;
`;

// TODO: liの丸消すやつを当てる
const ContextMenuItem = styled.default.li`
`;

export default class ContextMenu extends React.Component<Props> {
  static defaultProps = {
    left: 0,
    right: 0
  };
  render() {
    return (
      <ContextMenuRoot left={this.props.left} top={this.props.top}>
        {this.createItems()}
      </ContextMenuRoot>
    );
  }

  private createItems() {
    return this.props.items.map(v => <li>{v}</li>);
  }
}
