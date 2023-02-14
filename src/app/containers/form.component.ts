import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap, map } from 'rxjs';
import { timeoutProvider } from 'rxjs/internal/scheduler/timeoutProvider';

@Component({
  selector: 'my-form',
  template: `
    <ng-container *ngIf="updateMailStatus$ | async"/>
    <form [formGroup]="form">
      has an email ?
      <input formControlName="hasEmail" type="checkbox"/>
      <p>email :</p>
      <input formControlName="email"/>
    </form>
    <p *ngFor="let formVal of (formChange$ | async)">{{formVal  | json }}</p>
  `,
  styles: [`h1 { font-family: Lato; }`],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FormComponent {
  outputs: any[] = [];
  @Input() name: string;

  get email() {
    return this.form.controls.email;
  }

  get hasEmail() {
    return this.form.controls.hasEmail;
  }

  form: FormGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: false }),
    hasEmail: new FormControl(true),
  });

  updateMailStatus$ = this.form.controls.hasEmail.valueChanges.pipe(
    tap((val) => this.updateEmailStatus(val))
  );

  formChange$ = this.form.valueChanges.pipe(
    tap((val: {}) => this.outputs.push(val)),
    map((val) => this.outputs)
  );

  updateEmailStatus(val: any): void {
    if (val) {
      this.email.enable();
      return;
    }
    this.email.disable();
  }
}
