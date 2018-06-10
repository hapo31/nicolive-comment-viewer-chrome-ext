import { Chat } from "../model/Chat";

export type Thread = {
  threadId: number;
  rawChatList: Chat[];
  roomName: string;
  showCount: number;
};

export default class ThreadState implements Thread {
  public threadId = 0;
  public rawChatList: Chat[] = [];
  public roomName = "-";
  public showCount = 100;

  constructor(state?: Partial<Thread>) {
    if (state) {
      Object.assign(this, state);
    }
  }

  public get chatList() {
    return this.rawChatList.slice(0, this.showCount);
  }
}
