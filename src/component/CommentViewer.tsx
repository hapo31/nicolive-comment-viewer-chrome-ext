import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import { inject, observer } from "mobx-react";

@inject("commentViewer")
@observer
export default class CommentViewer extends React.Component<{
  commentViewer?: CommentViewerStore;
}> {
  componentWillMount() {
    if (!this.props.commentViewer) {
      return;
    }

    this.props.commentViewer.connectMessageServer();
  }

  render() {
    if (!this.props.commentViewer) {
      return <div>NowLoading...</div>;
    }
    return (
      <>
        <div>コメビュの領域↓</div>
        {this.props.commentViewer.threadList.map(thread => {
          return (
            <div>
              ThreadID: {thread.threadId}
              {thread.chatList.map(v => {
                return (
                  <div>
                    No:{v.commentNo} {v.userId} {v.content}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  }
}
