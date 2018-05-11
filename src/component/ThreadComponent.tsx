import * as React from "react";
import { inject, observer } from "mobx-react";
import ThreadStore from "../store/ThreadStore";
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
      <div className="ThreadComponents">
        ThreadID: {thread.threadId}
        {thread.chatList.map(v => {
          return (
            <div className="Comment" key={v.commentNo}>
              No:{v.commentNo} {v.userId} {v.comment}
            </div>
          );
        })}
      </div>
    );
  }
}
