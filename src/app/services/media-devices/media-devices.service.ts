import {Injectable} from '@angular/core';
import {Device, OpenVidu} from "openvidu-browser";

@Injectable({
  providedIn: 'root'
})
export class MediaDevicesService {

  private _openvidu: OpenVidu;
  private _cameras: Device[];
  private _microphones: Device[];
  private _speakers: Device[];

  private _selectedMicrophone: string | null;
  private _selectedCamera: string | null;
  private _selectedSpeaker: string | null;

  constructor() {
    this._openvidu = new OpenVidu();
    this._cameras = [];
    this._microphones = [];
    this._speakers = [];



    this._openvidu.getDevices().then(devices => {

      devices.forEach(device => {
        if (device.kind == "videoinput") {
          this._cameras.push(device);
        } else if(device.kind == "audioinput") {
          this._microphones.push(device);
        } else {
          this._speakers.push(device);
        }
      });

      console.warn("Cameras", this._cameras);
      console.warn("Microphones", this._microphones);
      console.warn("Speakers", this._speakers);

      this._selectedCamera = this.hasCameras ? this._cameras[0].deviceId : null;
      this._selectedMicrophone = this.hasMicrophones ? this._microphones[0].deviceId : null;
      this._selectedSpeaker = this.hasSpeakers ? this._speakers[0].deviceId : null;
    });
  }

  get selectedCamera(): string | null {
    return this._selectedCamera;
  }

  get selectedMicrophone(): string | null {
    return this._selectedMicrophone;
  }

  get selectedSpeaker(): string | null {
    return this._selectedSpeaker;
  }

  get hasCameras(): boolean {
    return this._cameras.length > 0;
  }

  get hasMicrophones(): boolean {
    return this._microphones.length > 0;
  }

  get hasSpeakers(): boolean {
    return this._speakers.length > 0;
  }

  get cameras(): Device[] {
    return this._cameras;
  }

  get microphones(): Device[] {
    return this._microphones;
  }

  get speakers(): Device[] {
    return this._speakers;
  }

}
