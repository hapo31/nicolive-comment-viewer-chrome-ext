import { ChatData } from "../infra/ChatData";

export class Chat {
  public readonly comment: string;
  public readonly date: Date;
  public readonly locale: string;
  public readonly is184: boolean;
  public readonly commentNo: number;
  public readonly userId: string;
  public readonly vPos: number;

  private readonly internalId: string;
  private readonly premium?: 1 | 2 | 3;

  constructor(data: ChatData) {
    this.comment = data.content;
    this.date = new Date(data.date * 1000 + data.date_usec / 1000);
    this.locale = data.locale;
    this.is184 = data.anonymity === 1;
    this.commentNo = data.no;
    this.premium = data.premium;
    this.userId = data.user_id;
    this.vPos = data.vpos;
    this.internalId = Math.random()
      .toString(36)
      .slice(-10);
  }
  public get isNormalMember() {
    return this.premium == null;
  }

  public get isOperator() {
    return this.premium != null && this.premium === 2;
  }

  public get isCommand() {
    return this.premium != null && this.premium === 3;
  }

  public get isPremium() {
    return this.premium != null && this.premium === 1;
  }

  public get dateStr() {
    return `${`0${this.date.getHours()}`.slice(
      -2
    )}:${`0${this.date.getMinutes()}`.slice(-2)}`;
  }

  public get uniqueKey() {
    return `${this.commentNo}_${this.internalId}_${this.userId}`;
  }
}
