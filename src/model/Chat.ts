import { ChatData } from "../infra/ChatData";

export class Chat {
  public readonly data: ChatData;

  constructor(data: ChatData) {
    this.data = data;
  }
  public get comment(): string {
    return this.data.content;
  }
  public get locale(): string {
    return this.data.locale;
  }
  public get is184(): boolean {
    return this.data.anonymity === 1;
  }
  public get commentNo(): number {
    return this.data.no;
  }
  public get userId(): string {
    return this.data.user_id;
  }
  public get vPos(): number {
    return this.data.vpos;
  }

  public get date(): Date {
    return new Date(this.data.date * 1000 + this.data.date_usec / 1000);
  }

  public get isNormalMember() {
    return this.data.premium == null;
  }

  public get isOperator() {
    return this.data.premium != null && this.data.premium === 2;
  }

  public get isCommand() {
    return this.data.premium != null && this.data.premium === 3;
  }

  public get isPremium() {
    return this.data.premium != null && this.data.premium === 1;
  }

  public get dateStr() {
    return `${`${this.date.getHours()}`.slice(
      -2
    )}:${`0${this.date.getMinutes()}`.slice(-2)}`;
  }

  public get uniqueKey() {
    return `${this.commentNo}_${this.date}_${this.userId}`;
  }
}
