import * as React from "react";
import { inject, observer } from "mobx-react";
import ThreadStore from "../store/ThreadStore";
import * as styled from "styled-components";

const defaultStyle = styled.default;

const ThreadView = styled.default.div`
max-height: 300px;
overflow-y: auto;
overflow-x: auto;
border-radius: 5px;
border: 1px solid #ddd;
`;

const CommentGridView = defaultStyle.div`
${(prop: { isOperator?: boolean }) => (prop.isOperator ? "color: red" : "")}
border-bottom: solid 1px gray;
height: 20px;
font-size: 16px;
`;

const Grid = defaultStyle.div`
${(prop: { width?: number }) => {
  if (prop.width) {
    return `width: ${prop.width}%`;
  }
}}
display: inline-block;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 0 5px;
border-left: solid 1px gray;
`;

@inject("threadStore")
@observer
export default class ThreadComponent extends React.Component<{
  threadStore?: ThreadStore;
}> {
  render() {
    if (!this.props.threadStore) {
      return null;
    }
    const thread = this.props.threadStore;
    return (
      <ThreadView className="Thread">
        {thread.chatList.filter((_, i) => i <= 100).map(v => {
          return (
            <CommentGridView
              className="Comment"
              isOperator={v.isOperator || v.isCommand}
              key={`${v.date.getTime()}_${v.userId}`}
            >
              <Grid width={5}>{v.commentNo}</Grid>
              <Grid width={10}>{v.userId}</Grid>
              <Grid width={75}>{v.comment}</Grid>
              <Grid width={5}>{v.dateStr}</Grid>
            </CommentGridView>
          );
        })}
      </ThreadView>
    );
  }
}
