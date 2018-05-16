import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import { inject, observer } from "mobx-react";
import ThreadComponent from "./ThreadComponent";
import YomiageSkeltonComponent from "./YomiageSkelton";
import * as styled from "styled-components";

const defaultStyle = styled.default;

const CommentViewerRoot = defaultStyle.div`
  background-color: #fff;
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
        {this.props.commentViewer.threadList.map(thread => {
          return (
            <>
              <RoomName>{thread.roomName}</RoomName>
              <ThreadComponent threadStore={thread} />
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
