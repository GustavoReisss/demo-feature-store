import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [InputComponent, FormsModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
  value = '123'
}
