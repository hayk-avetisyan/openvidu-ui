import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  roomId: string;
  role: string;

  constructor(
    private router: Router,
  ) {
  }

  async join(): Promise<void> {
    if(this.role) {
      await this.router.navigateByUrl(`room/${this.role}/${this.roomId}`)
    }
  }

}
