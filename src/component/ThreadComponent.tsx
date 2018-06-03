import * as React from "react";
import { inject, observer } from "mobx-react";
import ThreadStore from "../store/ThreadStore";
import * as styled from "styled-components";

const LINE_HEIGHT = "24px";

const MIN_COMMENT_GRID_COUNT = 13;

const defaultStyle = styled.default;

const ThreadView = styled.default.div`
  z-index: 9999;
  height: 300px;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const CommentGridView = defaultStyle.div`
${(prop: { isOperator?: boolean }) => (prop.isOperator ? "color: red" : "")}
  border-bottom: solid 1px gray;
  height: ${LINE_HEIGHT};
  font-size: 14px;
`;

const Grid = defaultStyle.div`
  ${(prop: { width?: number }) => {
    if (prop.width) {
      return `width: ${prop.width}%`;
    }
  }}
  display: inline-block;
  height: ${LINE_HEIGHT};
  padding-left: 3px;
  padding-top: 1px;
  border-left: solid 1px gray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const GridItem = defaultStyle.span`
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
              key={v.uniqueKey}
            >
              <Grid width={5}>
                <GridItem>
                  {v.commentNo != null ? v.commentNo : <>&nbsp;</>}
                </GridItem>
              </Grid>
              <Grid width={10}>
                <GridItem>{v.userId}</GridItem>
              </Grid>
              <Grid width={75}>
                <GridItem>{v.comment}</GridItem>
              </Grid>
              <Grid width={5}>
                <GridItem>{v.dateStr}</GridItem>
              </Grid>
            </CommentGridView>
          );
        })}
        {(() => {
          // コメントの数が縦幅に満たない場合は何も表示されていないグリッドを表示
          if (thread.chatList.length < MIN_COMMENT_GRID_COUNT) {
            return this.craeteSkeltonCommentGrid(
              MIN_COMMENT_GRID_COUNT - thread.chatList.length
            );
          }
        })()}
      </ThreadView>
    );
  }

  private craeteSkeltonCommentGrid(count: number) {
    return new Array(count).fill(0).map((_, i) => (
      <CommentGridView className="Comment-empty" isOperator={false} key={i}>
        <Grid width={5}>&nbsp;</Grid>
        <Grid width={10}>&nbsp;</Grid>
        <Grid width={75}>&nbsp;</Grid>
        <Grid width={5}>&nbsp;</Grid>
      </CommentGridView>
    ));
  }
}
