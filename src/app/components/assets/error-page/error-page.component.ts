import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  @Input() public errorCode: number = 404; 
}
