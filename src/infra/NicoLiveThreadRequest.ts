export default class NicoLiveThreadRequest {
  static createPayload(
    threadId: number,
    userId: string,
    resFrom = -1000,
    version = "20061206"
  ) {
    return JSON.stringify({
      thread: {
        fork: 0,
        nicoru: 0,
        res_from: resFrom,
        scores: 1,
        thread: threadId.toString(),
        user_id: userId.toString(),
        version,
        with_global: 1
      }
    });
  }
}

export type ThreadRequest = {
  fork: number;
  nicoru: 0 | 1;
  res_from: number;
  scores: number;
  thread: string;
  user_id: string;
  version: string;
  with_global: number;
};
