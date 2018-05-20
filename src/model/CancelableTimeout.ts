export default class CancelableTimeout {
  private timer: number = 0;

  constructor(private callback: () => void, timeout: number, ...args: any[]) {
    this.timer = window.setTimeout(callback, timeout, ...args);
  }

  public cancel() {
    clearTimeout(this.timer);
    this.timer = 0;
  }
}
