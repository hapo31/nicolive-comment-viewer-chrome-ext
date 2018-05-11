import { observable, action } from "mobx";
import { Chat, ChatData } from "../model/Chat";
export default class ThreadStore {
  @observable public threadId: number = 0;
  @observable public chatList: Chat[] = [];

  constructor(props?: Partial<ThreadStore>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @action.bound
  public pushChatData(data: ChatData) {
    this.chatList.push(new Chat(data));
    // 追加のたびにソートするのはパフォーマンスまずそう
    this.chatList.sort((a, b) => a.commentNo - b.commentNo);
  }

  public get lastChat() {
    return this.chatList.length !== 0
      ? this.chatList[this.chatList.length - 1]
      : null;
  }
}
