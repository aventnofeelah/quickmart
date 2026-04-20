import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-container">
          <div class="hero-content fade-in">
            <span class="badge">Marketplace 2026</span>
            <h1>Shop Smarter with <span>QuickMart</span></h1>
            <p>Join the fastest growing marketplace in Almaty. Reliable service and quality products.</p>
            <div class="hero-btns">
              <a routerLink="/products" class="btn btn-primary">Start Shopping <i class="fas fa-arrow-right"></i></a>
              <a routerLink="/register" class="btn btn-outline" *ngIf="!isLoggedIn()">Join as Seller</a>
            </div>
          </div>
          <div class="hero-image fade-in">
            <img src="assets/images/hero.png" alt="QuickMart Hero" onerror="this.src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000'">
          </div>
        </div>
      </section>

      <!-- Placeholder Categories Section -->
      <section class="categories container">
        <h2 class="section-title">Explore Our Marketplace</h2>
        <div class="empty-state">
          <i class="fas fa-boxes"></i>
          <h3>We are preparing something big!</h3>
          <p>Categories and products will be available shortly after our sellers finish setting up their shops.</p>
          <a routerLink="/register" class="btn btn-secondary" *ngIf="!isLoggedIn()">Be the first seller <i class="fas fa-rocket"></i></a>
        </div>
      </section>

      <!-- Partners Section -->
      <section class="partners container">
        <h2 class="section-title">Academic Support</h2>
        <div class="partner-logos">
          <div class="partner-item">
            <a href="https://kbtu.edu.kz/ru/" target="_blank">
              <img src="assets/images/logo_kbtu.jpg" alt="KBTU">
            </a>
            <p>Technological Partner</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home { min-height: 100vh; }
    .hero {
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      padding: 80px 0;
      overflow: hidden;
    }

    .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 50px;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      line-height: 1.1;
      margin: 20px 0;
      font-weight: 800;
    }

    .hero-content h1 span {
      color: var(--primary);
    }

    .hero-content p {
      font-size: 1.1rem;
      color: var(--text-light);
      margin-bottom: 35px;
      max-width: 500px;
    }

    .hero-content .badge {
      background: rgba(0, 137, 208, 0.1);
      color: var(--primary);
      padding: 6px 15px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .hero-btns {
      display: flex;
      gap: 15px;
    }

    .btn-outline {
      border: 1px solid var(--border);
      background: white;
    }

    .hero-image img {
      width: 100%;
      border-radius: 24px;
      box-shadow: 20px 20px 60px rgba(0,0,0,0.08);
      max-height: 500px;
      object-fit: cover;
    }

    .empty-state {
      text-align: center;
      padding: 80px 40px;
      background: var(--bg-offset);
      border-radius: 20px;
      margin: 40px 0;
    }

    .empty-state i {
      font-size: 4rem;
      color: #cbd5e0;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      font-size: 1.8rem;
      margin-bottom: 15px;
      color: #2d3748;
    }

    .empty-state p {
      color: #718096;
      margin-bottom: 30px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    .section-title {
      text-align: center;
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 40px;
    }

    .partners { padding: 80px 0; border-top: 1px solid var(--border); }
    .partner-logos { display: flex; justify-content: center; gap: 80px; align-items: center; margin-top: 40px; }
    .partner-item { text-align: center; }
    .partner-item img { height: 90px; border-radius: 12px; filter: grayscale(100%); opacity: 0.6; transition: 0.3s; margin-bottom: 15px; }
    .partner-item:hover img { filter: grayscale(0%); opacity: 1; transform: scale(1.05); }
    .partner-item p { font-weight: 600; font-size: 0.85rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px; }
    
    @media (max-width: 768px) {
      .hero-container { grid-template-columns: 1fr; text-align: center; }
      .hero-content h1 { font-size: 2.5rem; }
      .hero-content p { margin-left: auto; margin-right: auto; }
      .hero-btns { justify-content: center; }
    }
  `]
})
export class HomeComponent {
  private authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
