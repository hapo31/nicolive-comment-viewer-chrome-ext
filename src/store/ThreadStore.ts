import { observable, action } from "mobx";
import { Chat, ChatData } from "../model/Chat";

export default class ThreadStore {
  @observable public threadId: number = 0;
  @observable public rawChatList: Chat[] = [];
  @observable public chatList: Chat[] = [];
  @observable public roomName: string = "-";

  @observable public showCommand = true;
  @observable public showOperatorComment = true;

  private chatListCache: Chat[] = [];
  private timer: number = 0;

  constructor(props?: Partial<ThreadStore>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @action.bound
  public pushChatData(data: ChatData) {
    this.chatListCache.push(new Chat(data));

    if (this.timer !== 0) {
      clearTimeout(this.timer);
    }
    // 起動時などに一気にコメントが追加されると激重になるので、
    // 自前でデータへの反映にthrottleを掛ける
    this.timer = window.setTimeout(() => {
      this.chatList = this.chatList
        .concat(this.chatListCache)
        .filter(chat => this.testCommentFilter(chat))
        .sort(
          (a, b) =>
            b.commentNo != null
              ? b.commentNo - a.commentNo
              : b.date.getTime() - a.date.getTime()
        );

      this.rawChatList = this.rawChatList
        .concat(this.chatListCache)
        .sort(
          (a, b) =>
            b.commentNo != null
              ? b.commentNo - a.commentNo
              : b.date.getTime() - a.date.getTime()
        );

      this.chatListCache = [];
      this.timer = 0;
    }, 100);
  }

  public get lastChat() {
    return this.chatListCache.length !== 0
      ? this.chatListCache[this.chatListCache.length - 1]
      : null;
  }

  private testCommentFilter(chat: Chat) {
    return (
      chat.isNormalMember ||
      chat.isCommand !== this.showCommand ||
      chat.isOperator !== this.showOperatorComment
    );
  }
}
