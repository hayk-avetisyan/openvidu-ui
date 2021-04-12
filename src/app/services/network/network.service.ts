import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import AppConstant from "../../utils/app.constants";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) {}

  createRoom(roomId: string) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(AppConstant.ROOM_CREATE_URL, roomId).subscribe({
        next() {
          resolve(void 0);
        },
        error(error) {
          console.warn(error);
          reject(error);
        }
      });
    });
  }


  createConnection(roomId: string, role): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(AppConstant.CONNECTION_CREATE_URL, JSON.stringify({roomId, role}))
        .subscribe({
          next(connection) {
            resolve(connection.token);
          },
          error(error) {
            console.warn(error);
            reject(error);
          }
        });
    });
  }

}
