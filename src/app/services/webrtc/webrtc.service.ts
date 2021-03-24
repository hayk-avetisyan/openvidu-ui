import {Injectable} from '@angular/core';
import {NetworkService} from "../network/network.service";
import {AccountModel} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class WebRTCService {

  private account: AccountModel;

  constructor(private ovnet: NetworkService) {
  }

  initialize(account) {
    this.account = account;
  }

  async createRoom(): Promise<void> {
    await this.ovnet.createRoom(this.account.roomId);
  }

  async joinToRoom() {
    let token: string = await this.ovnet.createConnection(this.account.roomId, this.account.role);
    await this.account.session.connect(token);
    this.account.join();
  }


}
