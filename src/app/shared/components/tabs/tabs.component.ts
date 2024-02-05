import { Component, Input, computed, input, signal } from '@angular/core';

export interface TabOption {
  label: string,
  value: any
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  // Inputs
  // @Input() labelKey: null | string = null
  @Input() labelKey: null | string = "label"
  @Input() valueKey: null | string = null
  @Input() placeholder = "Selecione..."
  _options = input<any[]>([{ "label": "Feature", "value": "" }, { "label": "Tabela", "value": "" }], { alias: 'options' })

  // Options
  options = computed<TabOption[]>(() => this._options().map(option => {
    return {
      'label': String((this.labelKey) ? option[this.labelKey] : option),
      'value': (this.valueKey) ? option[this.valueKey] : option
    }
  }))

  selectedOption = signal<TabOption | undefined>(undefined)
}
