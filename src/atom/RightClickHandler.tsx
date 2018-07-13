import React from "react";

type Props = {
  onRightClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
};
export default class RightClickHandler extends React.PureComponent<Props> {
  render() {
    return <span onClick={this.onRightClick}>{this.props.children}</span>;
  }

  private onRightClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (e.button === 2) {
      this.props.onRightClick(e);
      e.preventDefault();
    }
  };
}
