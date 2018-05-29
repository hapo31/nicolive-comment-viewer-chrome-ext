import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import { inject, observer, Provider } from "mobx-react";
import ThreadComponent from "./ThreadComponent";
import YomiageSkeltonComponent from "./YomiageSkelton";
import * as styled from "styled-components";

const defaultStyle = styled.default;

const CommentViewerRoot = defaultStyle.div`
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const RoomName = defaultStyle.div`
  font-weight: bold;
  font-size: 20px;
`;

type Props = {
  commentViewer?: CommentViewerStore;
};

type State = {
  yomiageSkeltonComponent?: JSX.Element;
};

@inject("commentViewer")
@observer
export default class CommentViewer extends React.Component<Props, State> {
  componentDidMount() {
    if (!this.props.commentViewer) {
      return;
    }
    this.props.commentViewer.addOnReceiveHandler(this.onReceiveChat);
  }

  render() {
    if (!this.props.commentViewer) {
      return <div>NowLoading...</div>;
    }
    return (
      <CommentViewerRoot>
        <div className="debug-container">
          ThreadCount:{this.props.commentViewer.threadStoreList.length}
          <ul>
            {this.props.commentViewer.threadStoreList.map(thread => (
              <li>
                [Room:{thread.roomName}][CommentCount:{
                  thread.rawChatList.length
                }][ShowingCount:{thread.chatList.length}]
              </li>
            ))}
          </ul>
        </div>
        {this.props.commentViewer.threadStoreList.map(thread => {
          return (
            <>
              <RoomName>{thread.roomName}</RoomName>
              <Provider threadStore={thread}>
                <ThreadComponent />
              </Provider>
            </>
          );
        })}
        {(() => {
          if (this.state && this.state.yomiageSkeltonComponent) {
            return this.state.yomiageSkeltonComponent;
          }
          return null;
        })()}
      </CommentViewerRoot>
    );
  }

  private onReceiveChat = (chat: { comment?: string; isCommand?: boolean }) => {
    if (chat.comment && !chat.isCommand) {
      this.setState({
        yomiageSkeltonComponent: (
          <YomiageSkeltonComponent message={chat.comment} />
        )
      });
    }
  };
}
