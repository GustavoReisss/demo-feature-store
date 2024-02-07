import { Component, signal } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '../../../../shared/components/combobox/combobox.component';
import { JsonPipe } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [InputComponent, FormsModule, ComboboxComponent, JsonPipe, SelectComponent, TabsComponent, PaginationComponent],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
  value = '123'


  options = [
    { "label": "option 1", "value": "1" },
    { "label": "option 2", "value": "2" },
    { "label": "option 3", "value": "3" },
    { "label": "option 4", "value": "4" },
    { "label": "option 5", "value": "5" },
    { "label": "option 6", "value": "6" },
    { "label": "option 7 option 7 option 7", "value": "7" },
  ]

  value2 = this.options[0]["value"]
  value3 = this.options[1]


  items = signal(10)

  increment() {
    this.items.update(items => items + 5)
  }
}
