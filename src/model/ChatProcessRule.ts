import { Chat } from "./Chat";

export default interface IChatProcessRule {
  ruleName: string;
  execute(chat: Chat): Chat;
}
