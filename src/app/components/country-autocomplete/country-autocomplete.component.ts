import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Observable} from "rxjs";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {Country} from "../../shared/enum/country";

@Component({
  selector: 'app-country-autocomplete',
  templateUrl: './country-autocomplete.component.html',
  styleUrl: './country-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryAutocompleteComponent),
      multi: true
    }
  ]
})
export class CountryAutocompleteComponent implements ControlValueAccessor {
  @Input() isDisabled = false;

  value: string = '';
  countries = Object.values(Country);
  filteredCountries: Country[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  onChange: any = () => {};
  onTouched: any = () => {};

  search = (text$: Observable<string>): Observable<string[]> => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => {
        this.value = term;
        this.onChange(term);

        return !term.length
          ? []
          : this.countries.filter(c => c.toLowerCase().includes(term.toLowerCase()))
      }))
  }

  formatter = (country: Country) => country ? country : '';

  selectItem(event: NgbTypeaheadSelectItemEvent): void {
    this.value = event.item;
    this.onChange(event.item);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
    this.cd.markForCheck();
  }

  registerOnChange(fn: string): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: string): void {
    this.onTouched = fn;
  }
}
