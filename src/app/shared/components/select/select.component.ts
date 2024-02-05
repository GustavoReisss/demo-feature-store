import { OverlayModule, ViewportRuler } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, computed, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

export interface SelectOption {
  label: string
  value: any
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [OverlayModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent {
  constructor(
    protected _viewportRuler: ViewportRuler,
    protected _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.lookForResizeChanges()
  }

  // Inputs
  @Input() color = 'primary'
  @Input() labelKey: null | string = null
  @Input() valueKey: null | string = null
  @Input() placeholder = "Selecione..."
  _options = input<any[]>([], { alias: 'options' })

  // Options
  options = computed<SelectOption[]>(() => this._options().map(option => {
    return {
      'label': String((this.labelKey) ? option[this.labelKey] : option),
      'value': (this.valueKey) ? option[this.valueKey] : option
    }
  }))

  selectedOption = signal<SelectOption | undefined>(undefined)


  // Controle do Overlay
  @ViewChild("trigger") trigger!: ElementRef
  protected readonly _destroy = new Subject<void>();
  comboboxWidth = 300
  isOpen = false

  lookForResizeChanges() {
    /**
     * Atualiza o tamanho do overlay quando ocorre
     * mudanças no tamanho da janela do navegador
    */
    this._viewportRuler
      .change()
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        if (this.isOpen) {
          this.recalculateWidth()
          this._changeDetectorRef.detectChanges();
        }
      });
  }

  private recalculateWidth() {
    this.comboboxWidth = this.trigger.nativeElement.getBoundingClientRect().width || 300;
  }


  // Propriedades para controle do formControl
  disabled = false
  touched = false
  onChange: any = () => { };
  onTouched: any = () => { }

  registerOnTouched(onTouched: any): void {
    // Armazenando a função default "onTouched" do formControl para caso seja necessário chamá-la manualmente
    this.onTouched = onTouched
  }

  registerOnChange(onChange: any): void {
    // Armazenando a função default "onChange" do formControl para caso seja necessário chamá-la manualmente
    this.onChange = onChange
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  writeValue(newValue: any): void {
    // Usado pelo FormsModule para escrever o valor em um FormControl
    this.selectedOption.set(this.options().find(option => option.value === newValue))
  }

  toggle() {
    this.recalculateWidth()
    this.isOpen = !this.isOpen
  }

  setOption(option: SelectOption) {
    this.selectedOption.set((this.selectedOption() !== option) ? option : undefined)
    this.onChange(this.selectedOption()?.value)
    this.isOpen = false
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
