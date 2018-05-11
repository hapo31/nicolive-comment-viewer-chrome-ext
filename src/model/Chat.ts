export type ChatData = {
  anonymity?: 1;
  content: string;
  date: number;
  date_usec: number;
  locale: string;
  mail: string;
  no: number;
  premium: 0 | 1;
  thread: number;
  user_id: string;
  vpos: number;
};

export class Chat {
  public readonly content: string;
  public readonly date: Date;
  public readonly locale: string;
  public readonly is184: boolean;
  public readonly commentNo: number;
  public readonly isPremium: boolean;
  public readonly userId: string;
  public readonly vPos: number;

  constructor(data: ChatData) {
    this.content = data.content;
    this.date = new Date(data.date * 1000 + data.date_usec / 1000);
    this.locale = data.locale;
    this.is184 = data.anonymity === 1;
    this.commentNo = data.no;
    this.isPremium = data.premium === 1;
    this.userId = data.user_id;
    this.vPos = data.vpos;
  }
}
