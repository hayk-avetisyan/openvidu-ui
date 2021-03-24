import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MediaDevicesService, WebRTCService} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {
  ConnectionEvent,
  PublisherProperties,
  StreamEvent,
  StreamPropertyChangedEvent,
  Subscriber
} from "openvidu-browser";
import {AccountModel} from "../../models";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @ViewChild("videoContainer", {read: ElementRef}) private videoContainer: ElementRef<HTMLDivElement>;

  public account: AccountModel;

  constructor(
    private route: ActivatedRoute,
    private ds: MediaDevicesService,
    private webRTC: WebRTCService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    let role = this.route.snapshot.params.role;
    let roomId = this.route.snapshot.params.roomId;

    this.account = new AccountModel(roomId, role);
    this.webRTC.initialize(this.account);

    this.subscribeToConnection();
    this.subscribeToStreamCreation();
    this.subscribeToStreamChange();
  }

  async joinToRoom(): Promise<void> {
    await this.webRTC.createRoom();
    await this.webRTC.joinToRoom();

    let config: PublisherProperties = {
      audioSource: this.ds.selectedMicrophone,
      videoSource: this.ds.selectedCamera,
      publishAudio: true,
      publishVideo: true,
    };

    this.account.publisherInit(this.videoContainer.nativeElement, config);
  }

  async publish() {
    await this.account.publish();
  }

  subscribeToConnection() {
    this.account.session.on("connectionCreated", (event: ConnectionEvent) => {
      console.warn("New Connection", event.connection);
    });
  }

  subscribeToStreamCreation() {
    this.account.session.on("streamCreated", (event: StreamEvent) => {
      console.warn("New Stream", event.stream);

      if (this.account.isMyOwnConnection(event.stream.connection)) return;

      let subscriber: Subscriber = this.account.session.subscribe(event.stream, this.videoContainer.nativeElement);
      subscriber.on("streamPlaying", () => {
        console.warn("Stream PLaying");
      });

      subscriber.on("videoPlaying", () => {
        console.warn("Video PLaying");
      })
    });
  }

  subscribeToStreamChange() {
    this.account.session.on("streamPropertyChanged", (event: StreamPropertyChangedEvent) => {
      console.warn("streamPropertyChanged");
    })
  }
}
