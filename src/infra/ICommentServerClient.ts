import { ChatData } from "../model/Chat";
export default interface ICommentServerClient {
  connect: (callback: (chatData: ChatData) => void) => void;
}
