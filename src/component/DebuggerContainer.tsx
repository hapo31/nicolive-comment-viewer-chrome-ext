import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import WindowMessagePassing from "./WindowMessagePassing";

type Props = {
  store?: CommentViewerStore;
  storeLoading: JSX.Element;
};

type State = {
  windowOpen: boolean;
};
export default class DebuggerContainer extends React.Component<Props, State> {
  public state = {
    windowOpen: false
  };

  componentDidMount() {
    this.setState({
      windowOpen: true
    });
  }

  render() {
    if (process.env.NODE_ENV !== "development") {
      return this.props.children;
    }

    if (this.props.store == null) {
      return this.props.storeLoading;
    }

    return (
      <>
        <WindowMessagePassing
          isNewWindow={this.state.windowOpen}
          onWindowClose={() => alert("閉じたな！")}
        >
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
        </WindowMessagePassing>
        {this.props.children}
      </>
    );
  }
}
