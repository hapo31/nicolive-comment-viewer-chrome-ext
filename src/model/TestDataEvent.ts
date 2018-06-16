class TestDataEventClass {
  private timer: number = 0;

  private commentNumber = 0;

  startChatEvent(
    handler: (e: MessageEvent) => void,
    interval = 1000,
    timeout = 3000
  ) {
    setTimeout(() => {
      this.timer = window.setInterval(() => {
        const data = JSON.stringify(
          this.createChatData(this.commentNumber, "hogehoge")
        );

        handler({ data } as any);
      }, interval);
    }, timeout);
  }

  clearEvent() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  roomEventOnce(handler: (e: MessageEvent) => void) {
    const roomData = JSON.stringify(this.createRoomData());

    handler({ data: roomData } as any);
  }

  private createChatData(
    commentNumber: number,
    comment: string,
    date: Date = new Date()
  ) {
    return {
      thread: 0,
      no: commentNumber,
      vpos: 0,
      date: date.getTime(),
      date_usec: 0,
      user_id: "0",
      locale: "ja-jp",
      score: -750,
      content: comment
    };
  }

  private createRoomData() {
    return {
      type: "watch",
      body: {
        room: {
          messageServerUri: "ws://omsg102.live.nicovideo.jp:92/websocket",
          messageServerType: "niwavided",
          roomName: "TestData",
          threadId: "0",
          forks: [0],
          importedForks: []
        },
        command: "currentroom"
      }
    };
  }
}

const TestDataEvent = new TestDataEventClass();
export default TestDataEvent;
