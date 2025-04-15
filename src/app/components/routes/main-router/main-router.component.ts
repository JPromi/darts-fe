import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMainComponent } from '../../assets/nav-main/nav-main.component';

@Component({
  selector: 'app-main-router',
  imports: [
    RouterOutlet,
    NavMainComponent
  ],
  templateUrl: './main-router.component.html',
  styleUrl: './main-router.component.scss'
})
export class MainRouterComponent {

}
