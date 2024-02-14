import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FeatureBagComponent } from '../../components/feature-bag/feature-bag.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ModalComponent, FeatureBagComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  showSelectedFeatures = signal(false)


  toggle() {
    this.showSelectedFeatures.set(!this.showSelectedFeatures())
  }


}
