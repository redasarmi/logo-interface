import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ButtonModule} from "primeng/button";
import { PasswordModule} from "primeng/password";
import { InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-signup-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, PasswordModule, InputTextModule, ReactiveFormsModule, InputTextareaModule],
  providers: [],
  templateUrl: './signup-view.component.html',
  styleUrl: './signup-view.component.css'
})
export class SignupViewComponent {
  formGroup: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
  });

}
