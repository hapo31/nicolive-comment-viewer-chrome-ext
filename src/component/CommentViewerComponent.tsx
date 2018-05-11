import * as React from "react";
import CommentViewerStore from "../store/CommentViewerStore";
import { inject, observer } from "mobx-react";
import ThreadComponent from "./ThreadComponent";
import YomiageSkeltonComponent from "./YomiageSkelton";

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
      <>
        <div>コメビュの領域↓</div>
        {this.props.commentViewer.threadList.map(thread => {
          return <ThreadComponent threadStore={thread} />;
        })}
        {(() => {
          if (this.state && this.state.yomiageSkeltonComponent) {
            return this.state.yomiageSkeltonComponent;
          }
          return null;
        })()}
      </>
    );
  }

  onReceiveChat = (chat: { comment?: string }) => {
    if (chat.comment) {
      this.setState({
        yomiageSkeltonComponent: (
          <YomiageSkeltonComponent message={chat.comment} />
        )
      });
    }
  };
}
