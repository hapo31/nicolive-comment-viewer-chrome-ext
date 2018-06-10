import { WorkerSendMessage } from "../worker/FilterWorker";
import { ChatData } from "./ChatData";
import Constants from "../constant/constants";

class CommentFilterWorker {
  private worker: Worker;
  private promiseResolve?: (chatList: ChatData[]) => void;

  constructor() {
    const srcElem: HTMLScriptElement | null = document.getElementById(
      Constants.Attribute.WorkerID
    ) as any;
    const src = srcElem!.getAttribute(Constants.Attribute.WorkerScriptAttr);
    this.worker = new Worker(src!);
    this.worker.onmessage = this.onMessage;
  }

  public async postMessage(message: WorkerSendMessage) {
    return new Promise<ChatData[]>(resolve => {
      this.promiseResolve = resolve;
      console.log("postMessage", message);
      this.worker.postMessage(message);
    });
  }

  private onMessage = (e: MessageEvent) => {
    if (this.promiseResolve && e.origin === "gomadango.com") {
      this.promiseResolve(JSON.parse(e.data));
      this.resetPromiseHandler();
    }
  };

  private resetPromiseHandler() {
    this.promiseResolve = undefined;
  }
}

const filterWorker = new CommentFilterWorker();
export default filterWorker;
