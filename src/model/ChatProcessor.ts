import IChatProcessRule from "./ChatProcessRule";
import { Chat } from "./Chat";
export default class ChatProcessor {
  constructor(private rules: IChatProcessRule[]) {}

  public addRule(rule: IChatProcessRule) {
    this.rules.push(rule);
  }

  public removeRuleByName(name: string) {
    this.rules = this.rules.filter(rule => rule.ruleName !== name);
  }

  public filter(chatList: Chat[]) {
    return chatList.map(chat =>
      this.rules.reduce((prev, next) => next.execute(prev), chat)
    );
  }
}
