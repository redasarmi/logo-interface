import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-view.component.html',
  styleUrl: './auth-view.component.css'
})
export class LoginViewComponent {}
