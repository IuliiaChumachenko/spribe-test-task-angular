import {AbstractControl} from "@angular/forms";
import moment from 'moment';

export const minDateValidator = (control: AbstractControl) => {
  const selectedDate = control.value;

  if (!selectedDate) {
    return null;
  }

  const todayMoment = moment();
  const selectedMoment = moment([selectedDate.year, selectedDate.month - 1, selectedDate.day]);

  return selectedMoment.isSameOrAfter(todayMoment, 'day') ? null : { maxDate: true };
}
