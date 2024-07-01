import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MockBackendInterceptor} from "./shared/mock-backend/mock-backend.interceptor";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormListComponent} from "./components/form-list/form-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CountryAutocompleteComponent} from "./components/country-autocomplete/country-autocomplete.component";
import {ValidationMessageDirective} from "./directives/validation-message.directive";
import {BtnsPanelComponent} from "./components/btns-panel/btns-panel.component";

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    CountryAutocompleteComponent,
    BtnsPanelComponent,
    ValidationMessageDirective
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
