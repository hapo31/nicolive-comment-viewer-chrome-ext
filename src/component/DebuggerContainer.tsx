import React from "react";
import CommentViewerStore from "../store/CommentViewerStore";

type Props = {
  store?: CommentViewerStore;
  storeLoading: JSX.Element;
};
export default class DebuggerContainer extends React.Component<Props> {
  render() {
    if (this.props.store == null) {
      return this.props.storeLoading;
    }

    return (
      <>
        <div className="debug-container">
          ThreadCount:{this.props.store!.threadStoreList.length}
          <ul>
            {this.props.store!.threadStoreList.map(thread => (
              <li>
                [Room:{thread.roomName}][CommentCount:{
                  thread.rawChatList.length
                }][ShowingCount:{thread.chatList.length}]
              </li>
            ))}
          </ul>
        </div>
        {this.props.children}
      </>
    );
  }
}
