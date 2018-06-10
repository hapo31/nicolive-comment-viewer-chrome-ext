import { ChatData } from "../infra/ChatData";

self.addEventListener("message", e => {
  console.log("onmessage", e);
  if (e.data.indexOf("raw") < 0 && e.data.indexOf("cache") < 0) {
    return;
  }
  const data: WorkerSendMessage = JSON.parse(e.data);
  const { raw: chatList, cache: chatListCache, config } = data;
  const result = chatList
    .concat(chatListCache)
    .filter(chat => testCommentFilter(chat, config))
    .sort(
      (a, b) =>
        b.no != null
          ? b.no - a.no
          : b.date + b.date_usec - (a.date + b.date_usec)
    );

  self.postMessage(JSON.stringify(result), "gomadango.com");
});

function testCommentFilter(chat: ChatData, config: WorkerFilterSettings) {
  return (
    Filter.isNormalMember(chat) ||
    Filter.isCommand(chat) !== config.isShowCommand ||
    Filter.isOperator(chat) !== config.isShowOperatorComment
  );
}

class Filter {
  public static isNormalMember(chat: ChatData) {
    return chat.premium == null;
  }

  public static isOperator(chat: ChatData) {
    return chat.premium != null && chat.premium === 2;
  }

  public static isCommand(chat: ChatData) {
    return chat.premium != null && chat.premium === 3;
  }
}

export type WorkerSendMessage = {
  raw: ChatData[];
  cache: ChatData[];
  config: WorkerFilterSettings;
};

export type WorkerFilterSettings = {
  isShowCommand: boolean;
  isShowOperatorComment: boolean;
};
