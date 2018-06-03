import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import { inject, observer, Provider } from "mobx-react";
import ThreadComponent from "./ThreadComponent";
import YomiageSkeltonComponent from "./YomiageSkelton";
import * as styled from "styled-components";
import DebuggerContainer from "./DebuggerContainer";
import Error from "../atom/Error";

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
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.commentViewer) {
      console.error("store not loaded!");
      return;
    }
    this.props.commentViewer.addOnReceiveHandler(this.onReceiveChat);
  }

  render() {
    return (
      <DebuggerContainer
        store={this.props.commentViewer}
        storeLoading={
          <Error className="Viewer-not-loaded">
            comment viewer not loaded...
          </Error>
        }
      >
        <CommentViewerRoot>
          {this.props.commentViewer!.threadStoreList.map(thread => {
            return (
              <>
                <RoomName>{thread.roomName}</RoomName>
                <ThreadComponent threadStore={thread} />
              </>
            );
          })}
          {this.state.yomiageSkeltonComponent}
        </CommentViewerRoot>
      </DebuggerContainer>
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
