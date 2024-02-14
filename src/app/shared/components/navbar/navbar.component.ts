import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { RouterLink } from '@angular/router';
import { FeatureBagService } from '../../services/feature-bag/feature-bag.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() bagClicked = new EventEmitter<void>()
  featureBagService = inject(FeatureBagService)

  selectedFiltersCounterDisplay = computed(() =>
    this.featureBagService.selectedFeatureCounter() > 100
      ? '9+'
      : String(this.featureBagService.selectedFeatureCounter()))
}
