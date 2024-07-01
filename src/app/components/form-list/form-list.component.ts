import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {countryValidator} from "../../shared/validatros/country-autocomplete-validator";
import {usernameValidator} from "../../shared/validatros/username-validator";
import {minDateValidator} from "../../shared/validatros/min-date-validator";
import {ApiService} from "../../services/api.service";
import {PUBLISH_USERS_URL} from "../../shared/constant/url.constant";

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormListComponent implements OnInit {
  usersForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      users: this.fb.array([])
    });

    this.addForm();
  }

  get usersFormArray(): FormArray {
    return this.usersForm.get('users') as FormArray;
  }

  addForm(): void {
    if (this.usersFormArray.length < 10 && !this.isSubmitting) {
      this.usersFormArray.push(this.fb.group({
        country: ['', [Validators.required, countryValidator]],
        name: ['', {
          validators: [Validators.required],
          asyncValidators: [usernameValidator(this.apiService)],
          updateOn: 'blur'
        }],
        birthday: ['', [Validators.required, minDateValidator]]
      }));
    }
  }

  confirmSubmission(): void {
    this.apiService.post(PUBLISH_USERS_URL, this.usersForm.value)
      .subscribe(() => this.usersForm.reset());
  }

  changeSubmitting(isSubmitting: boolean): void {
    this.isSubmitting = isSubmitting;
  }
}
