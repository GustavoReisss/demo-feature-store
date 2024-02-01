import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
