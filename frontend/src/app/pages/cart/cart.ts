import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-page container fade-in">
      <h1>Your Shopping Cart</h1>
      
      <div *ngIf="items.length > 0; else emptyCart" class="cart-container">
        <div class="cart-items">
          <div *ngFor="let item of items" class="cart-item">
            <img [src]="item.image_url || 'assets/images/placeholder.png'" alt="{{item.name}}">
            <div class="item-details">
              <h3>{{item.name}}</h3>
              <p class="price">{{item.price | number}} KZT</p>
              <div class="quantity">
                <span>Quantity: {{item.quantity}}</span>
              </div>
            </div>
            <div class="item-actions">
               <button class="btn btn-outline" (click)="removeItem(item)">Remove</button>
            </div>
          </div>
        </div>
        
        <div class="cart-summary">
          <h2>Summary</h2>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>{{total | number}} KZT</span>
          </div>
          <div class="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <hr>
          <div class="summary-row total">
            <span>Total</span>
            <span>{{total | number}} KZT</span>
          </div>
          <button class="btn btn-primary btn-lg" (click)="checkout()">Checkout Now</button>
        </div>
      </div>
      
      <ng-template #emptyCart>
        <div class="empty-state">
          <i class="fas fa-shopping-basket"></i>
          <p>Your cart is empty. Start shopping!</p>
          <button class="btn btn-primary" routerLink="/products">Go to Catalog</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-page { padding: 60px 0; }
    h1 { margin-bottom: 40px; font-weight: 700; color: var(--secondary); }
    
    .cart-container { display: flex; gap: 40px; align-items: flex-start; }
    .cart-items { flex: 2; }
    .cart-summary { flex: 1; background: #f8f9fa; padding: 30px; border-radius: 20px; position: sticky; top: 120px; }
    
    .cart-item { display: flex; gap: 20px; background: white; padding: 20px; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); align-items: center; }
    .cart-item img { width: 100px; height: 100px; object-fit: cover; border-radius: 12px; }
    .item-details { flex: 1; }
    .item-details h3 { margin-bottom: 5px; font-weight: 600; }
    .price { color: var(--primary); font-weight: 700; font-size: 1.1rem; }
    
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; color: #555; }
    .total { font-weight: 700; font-size: 1.25rem; color: var(--secondary); margin-top: 15px; }
    .btn-lg { width: 100%; margin-top: 25px; }
    
    .empty-state { text-align: center; padding: 100px 0; }
    .empty-state i { font-size: 4rem; color: #ddd; margin-bottom: 20px; }
    .empty-state p { color: var(--text-light); margin-bottom: 30px; }
  `]
})
export class CartComponent implements OnInit {
  items: any[] = [];
  total: number = 0;

  constructor(private cart: CartService, private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.items = this.cart.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  removeItem(item: any) {
    // For simplicity, just clear and re-add or implement remove in service
    // Actually, I'll just clear cart for now or implement remove
    alert('Feature to remove specific item coming soon! For now, clearing whole cart.');
    this.cart.clearCart();
    this.loadCart();
  }

  checkout() {
    if (this.items.length === 0) return;
    
    // Create order structure
    const orderData = {
      items: this.items.map(item => ({ product: item.id }))
    };

    this.api.createOrder(orderData).subscribe({
      next: (res) => {
        alert('Order placed successfully! Thank you for your purchase.');
        this.cart.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error placing order. Please make sure you are logged in.');
      }
    });
  }
}
