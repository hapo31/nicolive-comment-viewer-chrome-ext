import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import { inject, observer, Provider } from "mobx-react";
import ThreadComponent from "./ThreadComponent";
import YomiageSkeltonComponent from "./YomiageSkelton";
import * as styled from "styled-components";

const defaultStyle = styled.default;

const CommentViewerRoot = defaultStyle.div`
  background-color: #fff;
  height: 300px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const RoomName = defaultStyle.div`
  font-weight: bold;
  font-size: 20px;
`;

@inject("commentViewer")
@observer
export default class CommentViewer extends React.Component<
  {
    commentViewer?: CommentViewerStore;
  },
  {
    yomiageSkeltonComponent?: JSX.Element;
  }
> {
  componentWillMount() {
    if (!this.props.commentViewer) {
      return;
    }

    this.props.commentViewer.connectMessageServer();
    this.props.commentViewer.addOnReceiveHandler(this.onReceiveChat);
  }

  render() {
    if (!this.props.commentViewer) {
      return <div>NowLoading...</div>;
    }
    return (
      <CommentViewerRoot>
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
