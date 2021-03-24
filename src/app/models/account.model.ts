import {Connection, OpenVidu, Publisher, PublisherProperties, Session} from "openvidu-browser";
import AppConstant from "../utils/app.constants";

export class AccountModel {

  private _joined: boolean;
  private _publisher: Publisher;
  private _session: Session;
  private _ov: OpenVidu;

  constructor(private _roomId: string, private _role: 1 | 2 | 3) {
    this._joined = false;
    this._ov = new OpenVidu();
    this._session = this._ov.initSession();
    this._ov.secret = AppConstant.SECRET;
  }

  publisherInit(target: string | HTMLElement, properties: PublisherProperties) {
    this._publisher = this._ov.initPublisher(target, properties)
  }

  async publish() {
    await this._publisher.initialize();
    await this._session.publish(this._publisher);
  }

  isMyOwnConnection(connection: Connection): boolean {
    return connection.connectionId == this._session.connection.connectionId;
  }

  isModerator(): boolean {
    return this.role == 3;
  }

  isPublisher(): boolean {
    return this.role == 2;
  }

  isGuest(): boolean {
    return this.role == 1;
  }

  join(): void {
    this._joined = true;
  }

  joined(): boolean {
    return this._joined;
  }

  get session(): Session {
    return this._session;
  }

  get ov(): OpenVidu {
    return this._ov;
  }

  get role(): 1 | 2 | 3 {
    return this._role;
  }

  get roomId(): string {
    return this._roomId;
  }

}
