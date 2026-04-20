import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card fade-in">
        <div class="login-header">
          <h2>Login to Account</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>
        
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope"></i>
              <input 
                type="email" 
                id="email" 
                name="email" 
                [(ngModel)]="loginData.email" 
                required 
                placeholder="example@mail.com"
                #email="ngModel"
              >
            </div>
            <div class="error" *ngIf="email.invalid && email.touched">Please enter a valid email</div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <i class="fas fa-lock"></i>
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="loginData.password" 
                required 
                placeholder="••••••••"
                #password="ngModel"
              >
            </div>
             <div class="forgot-pass">
                <a href="#">Forgot password?</a>
             </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid">
            Login <i class="fas fa-sign-in-alt"></i>
          </button>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <a routerLink="/register">Create Account</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-offset);
      padding: 40px 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.05);
      width: 100%;
      max-width: 450px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 35px;
    }

    .login-header h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .login-header p {
      color: var(--text-light);
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .input-wrapper {
      position: relative;
    }

    .input-wrapper i {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-light);
    }

    .input-wrapper input {
      width: 100%;
      padding: 12px 15px 12px 45px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      outline: none;
      font-family: inherit;
      transition: var(--transition);
    }

    .input-wrapper input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(0, 137, 208, 0.1);
    }

    .error {
      color: #ff4757;
      font-size: 0.8rem;
      margin-top: 5px;
    }

    .forgot-pass {
      text-align: right;
      margin-top: 8px;
    }

    .forgot-pass a {
      font-size: 0.85rem;
      color: var(--primary);
    }

    .btn-block {
      width: 100%;
      margin-top: 10px;
      padding: 14px;
    }

    .login-footer {
      margin-top: 30px;
      text-align: center;
      border-top: 1px solid var(--border);
      padding-top: 20px;
    }

    .login-footer p {
      font-size: 0.9rem;
      color: var(--text-light);
    }

    .login-footer a {
      color: var(--primary);
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onLogin() {
    console.log('Login attempt:', this.loginData);
    // Here we will call the Auth service
    // For now, just redirect to home
    this.router.navigate(['/']);
  }
}
