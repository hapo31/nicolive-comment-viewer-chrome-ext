export interface AudienceMessage {
  type: AudienceMessageType;
  body: RoomBody;
}

interface RoomBody {
  room: Room;
  command: "currentroom";
}

interface Room {
  messageServerUri: string;
  messageServerType: string;
  roomName: string;
  threadId: string;
  forks: number[];
  importedForks: any[];
}

export enum AudienceMessageType {
  WATCH = "watch",
  PING = "ping"
}

export enum CommandType {
  SERVERTIME = "servertime",
  CURRENTROOM = "currentroom",
  STATISCS = "statiscs",
  COMMAND = "schedule"
}
