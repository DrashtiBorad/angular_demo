import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  count: number = 0;
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
