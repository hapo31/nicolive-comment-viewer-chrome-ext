import { WorkerSendMessage } from "../worker/FilterWorker";
import { ChatData } from "./ChatData";

class CommentFilterWorker {
  private worker = new Worker("worker.js");
  private promiseResolve?: (chatList: ChatData[]) => void;

  constructor() {
    this.worker.addEventListener("message", this.onMessage);
  }

  public postMessage(message: WorkerSendMessage) {
    return new Promise<ChatData[]>(resolve => {
      this.promiseResolve = resolve;
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
