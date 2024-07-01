import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Country} from "../enum/country";

export const countryValidator = (control: AbstractControl): ValidationErrors | null => {
  const isValid = Object.values(Country).includes(control.value);

  return isValid ? null : { 'invalidCountry': { value: control.value } };
}
