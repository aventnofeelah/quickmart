import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="header">
      <div class="container header-wrap">
        <!-- Logo Section -->
        <div class="logo-section">
          <a href="https://kbtu.edu.kz/ru/" target="_blank" class="kbtu-logo" title="KBTU Partner">
            <img src="assets/images/logo_kbtu.jpg" alt="KBTU">
          </a>
          <a routerLink="/" class="main-logo">
            <div class="logo-circle">
              <img src="assets/images/logo_qs.png" alt="QuickMart">
            </div>
          </a>
        </div>

        <!-- Nav -->
        <nav class="nav-bar">
          <ul class="nav-links">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <li><a routerLink="/products" routerLinkActive="active">Catalog</a></li>
            <li><a routerLink="/categories" routerLinkActive="active">Categories</a></li>
            <li><a routerLink="/about" routerLinkActive="active">About</a></li>
          </ul>
        </nav>

        <!-- Tools -->
        <div class="header-tools">
          <form (ngSubmit)="onSearch()" class="compact-search">
            <input type="text" name="searchQuery" [(ngModel)]="searchQuery" placeholder="Search">
            <button type="submit"><i class="fas fa-search"></i></button>
          </form>
          
          <div class="user-actions">
            <a routerLink="/cart" class="tool-icon cart">
              <i class="fas fa-shopping-bag"></i>
              <span class="count">0</span>
            </a>
            <div class="auth-box">
              <ng-container *ngIf="!isLoggedIn()">
                <a routerLink="/login" class="login-link">Login</a>
                <a routerLink="/register" class="reg-link">Join</a>
              </ng-container>
              <ng-container *ngIf="isLoggedIn()">
                <a (click)="logout()" class="logout-icon"><i class="fas fa-power-off"></i></a>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header { 
      background: white; 
      width: 100%; 
      position: sticky; 
      top: 0; 
      z-index: 1000; 
      box-shadow: 0 1px 15px rgba(0,0,0,0.05); 
      height: 90px;
      display: flex;
      align-items: center;
      overflow: visible;
    }
    
    .header-wrap { display: flex; align-items: center; justify-content: space-between; gap: 30px; width: 100%; }

    .logo-section { display: flex; align-items: center; gap: 20px; }
    .kbtu-logo img { height: 65px; border-radius: 12px; border: 1px solid #eee; }
    
    /* Round Logo Styling */
    .main-logo { text-decoration: none; display: block; }
    .logo-circle { 
      width: 75px; 
      height: 75px; 
      border-radius: 50%; 
      overflow: hidden; 
      border: 2px solid #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      transition: 0.3s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .logo-circle:hover { transform: scale(1.05); border-color: var(--primary); }
    .logo-circle img { width: 100%; height: 100%; object-fit: cover; }

    .nav-bar { flex: 1; }
    .nav-links { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
    .nav-links a { color: #333; font-weight: 700; text-decoration: none; font-size: 0.85rem; text-transform: uppercase; }
    .nav-links a:hover, .nav-links a.active { color: var(--primary); }

    .header-tools { display: flex; align-items: center; gap: 20px; }
    .compact-search { background: #f1f3f5; border-radius: 8px; padding: 0 12px; display: flex; align-items: center; height: 38px; }
    .compact-search input { border: none; background: transparent; outline: none; font-size: 0.85rem; width: 150px; }
    .compact-search button { border: none; background: transparent; color: #888; cursor: pointer; }
    
    .user-actions { display: flex; align-items: center; gap: 15px; }
    .tool-icon { font-size: 1.4rem; color: #333; position: relative; text-decoration: none; }
    .cart .count { position: absolute; top: -5px; right: -5px; background: var(--primary); color: white; font-size: 0.6rem; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }

    .auth-box { display: flex; gap: 12px; align-items: center; }
    .reg-link { background: #222; color: white !important; padding: 6px 16px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.85rem; }
  `]
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit() {}
  isLoggedIn() { return this.authService.isLoggedIn(); }
  onSearch() { console.log('Searching for:', this.searchQuery); }
  logout() { this.authService.logout(); window.location.reload(); }
}
