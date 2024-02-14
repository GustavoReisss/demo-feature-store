import { Component, inject } from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { FeatureBagService, SelectedFeatures } from '../../services/feature-bag/feature-bag.service';

@Component({
  selector: 'app-feature-bag',
  standalone: true,
  imports: [AccordionComponent, NgIf, AsyncPipe],
  templateUrl: './feature-bag.component.html',
  styleUrl: './feature-bag.component.scss'
})
export class FeatureBagComponent {
  private featureBagService = inject(FeatureBagService)

  selectedFeatures$ = this.featureBagService.selectedFeatures

  tableNames(selectedFeatures: SelectedFeatures) {
    return Object.keys(selectedFeatures)
  }
}
