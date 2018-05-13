export type ChatData = {
  anonymity?: 1;
  content: string;
  date: number;
  date_usec: number;
  locale: string;
  mail: string;
  no: number;
  premium?: 1 | 2;
  thread: number;
  user_id: string;
  vpos: number;
};

export class Chat {
  public readonly comment: string;
  public readonly date: Date;
  public readonly locale: string;
  public readonly is184: boolean;
  public readonly commentNo: number;
  public readonly userId: string;
  public readonly vPos: number;

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
  }

  public get isOperator() {
    return this.premium != null && this.premium === 3;
  }

  public get isCommand() {
    return this.premium != null && this.premium === 2;
  }

  public get isPremium() {
    return this.premium != null && this.premium === 1;
  }
}
