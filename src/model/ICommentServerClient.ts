import { ChatData } from "./Chat";
export default interface ICommentServerClient {
  connect: (callback: (chatData: ChatData) => void) => void;
}
